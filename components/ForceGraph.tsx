'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';

interface GraphNode extends d3.SimulationNodeDatum {
    id: string;
    slug: string;
    category: string;
    title: string;
    color: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
    type: 'related' | 'prerequisite';
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
    categories: { id: string; color: string; name: string }[];
}

export default function ForceGraph() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
    const [nodes, setNodes] = useState<GraphNode[]>([]);
    const [links, setLinks] = useState<GraphLink[]>([]);
    const [transform, setTransform] = useState({ x: 0, y: 0, k: 0.8 });
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const animateTransform = useCallback((from: typeof transform, to: typeof transform, duration: number) => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 0.5 - Math.cos(progress * Math.PI) / 2;

            setTransform({
                x: from.x + (to.x - from.x) * eased,
                y: from.y + (to.y - from.y) * eased,
                k: from.k + (to.k - from.k) * eased
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }, []);

    useEffect(() => {
        fetch('/graph-data.json')
            .then(res => res.json())
            .then(setGraphData)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!graphData || !svgRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const filteredNodes = selectedCategory
            ? graphData.nodes.filter(n => n.category === selectedCategory)
            : graphData.nodes;

        const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
        const filteredLinks = graphData.links.filter(l => {
            const source = typeof l.source === 'object' ? l.source.id : String(l.source);
            const target = typeof l.target === 'object' ? l.target.id : String(l.target);
            return filteredNodeIds.has(source) && filteredNodeIds.has(target);
        });

        const nodesCopy = filteredNodes.map(n => ({ ...n }));
        const linksCopy = filteredLinks.map(l => ({ ...l }));

        const simulation = d3.forceSimulation<GraphNode>(nodesCopy)
            .force('link', d3.forceLink<GraphNode, GraphLink>(linksCopy)
                .id((d) => d.id)
                .distance(120))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(40))
            .alphaDecay(0.03)
            .velocityDecay(0.4);

        let tickCount = 0;
        const maxTicks = 300;

        simulation.on('tick', () => {
            tickCount++;
            if (tickCount % 2 === 0) {
                setNodes([...nodesCopy]);
                setLinks([...linksCopy]);
            }
            if (tickCount >= maxTicks || simulation.alpha() < 0.01) {
                simulation.stop();
            }
        });

        const svg = d3.select(svgRef.current);
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                setTransform({
                    x: event.transform.x,
                    y: event.transform.y,
                    k: event.transform.k
                });
            });

        svg.call(zoom);
        svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8).translate(-width / 2, -height / 2));

        simulationRef.current = simulation;

        return () => {
            simulation.stop();
        };
    }, [graphData, selectedCategory]);

    const handleNodeClick = useCallback((node: GraphNode) => {
        router.push(`/wiki/${node.category}/${node.slug}`);
    }, [router]);

    const handleNodeMouseEnter = useCallback((node: GraphNode) => {
        setHoveredNode(node);
    }, []);

    const handleNodeMouseLeave = useCallback(() => {
        setHoveredNode(null);
    }, []);

    if (!graphData) {
        return <div className="flex items-center justify-center h-full">Loading graph...</div>;
    }

    if (isMobile) {
        return (
            <div className="h-full flex flex-col">
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Knowledge Graph</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        그래프 뷰는 데스크톱에서 최적화되어 있습니다.
                    </p>
                    <div className="space-y-2">
                        {graphData.categories.map(cat => {
                            const categoryNodes = graphData.nodes.filter(n => n.category === cat.id);
                            return (
                                <div key={cat.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <h3 className="font-semibold text-lg">{cat.name}</h3>
                                        <span className="text-sm text-gray-500">({categoryNodes.length})</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categoryNodes.slice(0, 10).map(node => (
                                            <button
                                                key={node.id}
                                                onClick={() => router.push(`/wiki/${node.category}/${node.slug}`)}
                                                className="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                {node.title}
                                            </button>
                                        ))}
                                        {categoryNodes.length > 10 && (
                                            <span className="px-3 py-1 text-sm text-gray-500">
                                                +{categoryNodes.length - 10} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-wrap gap-2 p-4 border-b bg-white dark:bg-gray-900">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded text-sm ${!selectedCategory ? 'bg-gray-800 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                    All
                </button>
                {graphData.categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${selectedCategory === cat.id ? 'ring-2 ring-offset-1' : ''}`}
                        style={{ backgroundColor: cat.color + '20', color: cat.color }}
                    >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                    </button>
                ))}
            </div>
            <div ref={containerRef} className="flex-1 relative bg-gray-50 dark:bg-gray-800">
                <svg ref={svgRef} className="w-full h-full">
                    <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
                        <g>
                            {links.map((link, i) => {
                                const source = link.source as GraphNode;
                                const target = link.target as GraphNode;
                                if (!source.x || !source.y || !target.x || !target.y) return null;
                                return (
                                    <line
                                        key={i}
                                        x1={source.x}
                                        y1={source.y}
                                        x2={target.x}
                                        y2={target.y}
                                        stroke={link.type === 'prerequisite' ? '#9333ea' : '#94a3b8'}
                                        strokeOpacity={0.6}
                                        strokeWidth={link.type === 'prerequisite' ? 2 : 1}
                                        strokeDasharray={link.type === 'prerequisite' ? '5,5' : 'none'}
                                    />
                                );
                            })}
                        </g>
                        <g>
                            {nodes.map((node) => {
                                if (!node.x || !node.y) return null;
                                return (
                                    <g key={node.id}>
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={12}
                                            fill={node.color}
                                            stroke="#fff"
                                            strokeWidth={2}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleNodeClick(node)}
                                            onMouseEnter={() => handleNodeMouseEnter(node)}
                                            onMouseLeave={handleNodeMouseLeave}
                                        />
                                        <text
                                            x={node.x + 15}
                                            y={node.y + 4}
                                            fontSize={10}
                                            fill="#374151"
                                            pointerEvents="none"
                                        >
                                            {node.title.length > 15 ? node.title.slice(0, 15) + '...' : node.title}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </g>
                </svg>
                {hoveredNode && (
                    <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg border">
                        <div className="font-semibold">{hoveredNode.title}</div>
                        <div className="text-sm text-gray-500">{hoveredNode.category}</div>
                    </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-2 rounded-lg shadow text-xs">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 border-t-2 border-purple-600 border-dashed" />
                        <span>Prerequisite</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 border-t border-gray-400" />
                        <span>Related</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
