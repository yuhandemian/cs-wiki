'use client';

import { useEffect, useRef, useState } from 'react';
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
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
    const router = useRouter();

    useEffect(() => {
        const basePath = process.env.NODE_ENV === 'production' ? '/cs-wiki' : '';
        fetch(`${basePath}/graph-data.json`)
            .then(res => res.json())
            .then(setGraphData)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!graphData || !svgRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g');

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.3, 4])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        const filteredNodes = selectedCategory
            ? graphData.nodes.filter(n => n.category === selectedCategory)
            : graphData.nodes;

        const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
        const filteredLinks = graphData.links.filter(l => {
            const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
            const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
            return filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId);
        });

        const simulation = d3.forceSimulation<GraphNode>(filteredNodes)
            .force('link', d3.forceLink<GraphNode, GraphLink>(filteredLinks)
                .id(d => d.id)
                .distance(80))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(30))
            .force('category', d3.forceRadial<GraphNode>(
                (d) => selectedCategory ? 0 : 200,
                width / 2,
                height / 2
            ).strength(d => selectedCategory && d.category === selectedCategory ? 0.5 : 0));

        const link = g.append('g')
            .selectAll('line')
            .data(filteredLinks)
            .join('line')
            .attr('stroke', d => d.type === 'prerequisite' ? '#9333ea' : '#94a3b8')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => d.type === 'prerequisite' ? 2 : 1)
            .attr('stroke-dasharray', d => d.type === 'prerequisite' ? '5,5' : 'none');

        const node = g.append('g')
            .selectAll('circle')
            .data(filteredNodes)
            .join('circle')
            .attr('r', 12)
            .attr('fill', d => d.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('click', (_, d) => {
                router.push(`/wiki/${d.category}/${d.slug}`);
            })
            .on('mouseenter', (_, d) => setHoveredNode(d))
            .on('mouseleave', () => setHoveredNode(null));

        (node as any).call(d3.drag<SVGCircleElement, GraphNode>()
            .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }));

        const label = g.append('g')
            .selectAll('text')
            .data(filteredNodes)
            .join('text')
            .text(d => d.title.length > 15 ? d.title.slice(0, 15) + '...' : d.title)
            .attr('font-size', 10)
            .attr('dx', 15)
            .attr('dy', 4)
            .attr('fill', '#374151')
            .style('pointer-events', 'none');

        simulation.on('tick', () => {
            link
                .attr('x1', d => (d.source as GraphNode).x!)
                .attr('y1', d => (d.source as GraphNode).y!)
                .attr('x2', d => (d.target as GraphNode).x!)
                .attr('y2', d => (d.target as GraphNode).y!);

            node
                .attr('cx', d => d.x!)
                .attr('cy', d => d.y!);

            label
                .attr('x', d => d.x!)
                .attr('y', d => d.y!);
        });

        if (selectedCategory) {
            simulation.on('end', () => {
                const categoryNodes = filteredNodes.filter(n => n.category === selectedCategory);
                if (categoryNodes.length === 0) return;

                const bounds = {
                    minX: d3.min(categoryNodes, d => d.x!) || 0,
                    maxX: d3.max(categoryNodes, d => d.x!) || 0,
                    minY: d3.min(categoryNodes, d => d.y!) || 0,
                    maxY: d3.max(categoryNodes, d => d.y!) || 0
                };

                const boundsWidth = bounds.maxX - bounds.minX;
                const boundsHeight = bounds.maxY - bounds.minY;
                const centerX = (bounds.minX + bounds.maxX) / 2;
                const centerY = (bounds.minY + bounds.maxY) / 2;

                const scale = Math.min(
                    width / (boundsWidth + 200),
                    height / (boundsHeight + 200),
                    2
                );

                svg.transition()
                    .duration(750)
                    .call(
                        zoom.transform,
                        d3.zoomIdentity
                            .translate(width / 2, height / 2)
                            .scale(scale)
                            .translate(-centerX, -centerY)
                    );
            });
        } else {
            svg.call(zoom.transform, d3.zoomIdentity.translate(width / 4, height / 4).scale(0.8));
        }

        return () => {
            simulation.stop();
        };
    }, [graphData, selectedCategory, router]);

    if (!graphData) {
        return <div className="flex items-center justify-center h-full">Loading graph...</div>;
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
                <svg ref={svgRef} className="w-full h-full" />
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
