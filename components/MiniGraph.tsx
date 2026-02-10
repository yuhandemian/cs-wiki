'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';

interface MiniGraphNode extends d3.SimulationNodeDatum {
    id: string;
    slug: string;
    category: string;
    title: string;
    color: string;
    isCurrent?: boolean;
}

interface MiniGraphLink extends d3.SimulationLinkDatum<MiniGraphNode> {
    type: 'related' | 'prerequisite';
}

interface GraphData {
    nodes: MiniGraphNode[];
    links: MiniGraphLink[];
}

interface MiniGraphProps {
    currentSlug: string;
    categorySlug: string;
}

export default function MiniGraph({ currentSlug, categorySlug }: MiniGraphProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [relatedNodes, setRelatedNodes] = useState<MiniGraphNode[]>([]);

    useEffect(() => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        fetch(`${basePath}/graph-data.json`)
            .then(res => res.json())
            .then((data: GraphData) => {
                const currentId = `${categorySlug}/${currentSlug}`;
                const currentNode = data.nodes.find(n => n.id === currentId);

                if (!currentNode) {
                    setGraphData(null);
                    return;
                }

                const connectedIds = new Set<string>();
                connectedIds.add(currentId);

                data.links.forEach(link => {
                    const sourceId = typeof link.source === 'string' ? link.source : (link.source as MiniGraphNode).id;
                    const targetId = typeof link.target === 'string' ? link.target : (link.target as MiniGraphNode).id;

                    if (sourceId === currentId) connectedIds.add(targetId);
                    if (targetId === currentId) connectedIds.add(sourceId);
                });

                const filteredNodes = data.nodes
                    .filter(n => connectedIds.has(n.id))
                    .map(n => ({
                        ...n,
                        isCurrent: n.id === currentId,
                    }));

                const filteredLinks = data.links.filter(link => {
                    const sourceId = typeof link.source === 'string' ? link.source : (link.source as MiniGraphNode).id;
                    const targetId = typeof link.target === 'string' ? link.target : (link.target as MiniGraphNode).id;
                    return connectedIds.has(sourceId) && connectedIds.has(targetId);
                });

                setGraphData({ nodes: filteredNodes, links: filteredLinks });
                setRelatedNodes(filteredNodes.filter(n => !n.isCurrent));
            })
            .catch(console.error);
    }, [currentSlug, categorySlug]);

    useEffect(() => {
        if (!graphData || !svgRef.current || graphData.nodes.length === 0) return undefined;

        const width = 280;
        const height = 200;

        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const simulation = d3.forceSimulation<MiniGraphNode>(graphData.nodes)
            .force('link', d3.forceLink<MiniGraphNode, MiniGraphLink>(graphData.links)
                .id(d => d.id)
                .distance(60))
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .selectAll('line')
            .data(graphData.links)
            .join('line')
            .attr('stroke', d => d.type === 'prerequisite' ? '#9333ea' : '#94a3b8')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => d.type === 'prerequisite' ? 2 : 1)
            .attr('stroke-dasharray', d => d.type === 'prerequisite' ? '4,4' : 'none');

        const node = svg.append('g')
            .selectAll('circle')
            .data(graphData.nodes)
            .join('circle')
            .attr('r', d => d.isCurrent ? 14 : 10)
            .attr('fill', d => d.color)
            .attr('stroke', d => d.isCurrent ? '#000' : '#fff')
            .attr('stroke-width', d => d.isCurrent ? 3 : 2);

        const label = svg.append('g')
            .selectAll('text')
            .data(graphData.nodes)
            .join('text')
            .text(d => d.title.length > 12 ? d.title.slice(0, 12) + '..' : d.title)
            .attr('font-size', 9)
            .attr('text-anchor', 'middle')
            .attr('dy', 25)
            .attr('fill', '#374151')
            .attr('font-weight', d => d.isCurrent ? 'bold' : 'normal');

        simulation.on('tick', () => {
            link
                .attr('x1', d => (d.source as MiniGraphNode).x!)
                .attr('y1', d => (d.source as MiniGraphNode).y!)
                .attr('x2', d => (d.target as MiniGraphNode).x!)
                .attr('y2', d => (d.target as MiniGraphNode).y!);

            node
                .attr('cx', d => Math.max(15, Math.min(width - 15, d.x!)))
                .attr('cy', d => Math.max(15, Math.min(height - 15, d.y!)));

            label
                .attr('x', d => Math.max(15, Math.min(width - 15, d.x!)))
                .attr('y', d => Math.max(15, Math.min(height - 15, d.y!)));
        });

        return () => { simulation.stop(); };
    }, [graphData]);

    if (!graphData || graphData.nodes.length <= 1) {
        return null;
    }

    return (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-sm font-semibold mb-2">Related Concepts</h3>
            <svg ref={svgRef} className="w-full" />
            <div className="mt-2 flex flex-wrap gap-1">
                {relatedNodes.map(node => (
                    <Link
                        key={node.id}
                        href={`/wiki/${node.category}/${node.slug}`}
                        className="text-xs px-2 py-1 rounded hover:opacity-80"
                        style={{ backgroundColor: node.color + '20', color: node.color }}
                    >
                        {node.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
