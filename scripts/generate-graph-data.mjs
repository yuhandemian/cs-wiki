import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const publicDirectory = path.join(process.cwd(), 'public');

const categoryDirToSlug = {
    'Algorithm': 'algorithm',
    'Data-Structure': 'data-structure',
    'Database': 'database',
    'Java': 'java',
    'Network': 'network',
    'Operating-System': 'operating-system',
    'Spring': 'spring',
};

const categoryColors = {
    'algorithm': '#ef4444',
    'data-structure': '#f97316',
    'database': '#eab308',
    'java': '#22c55e',
    'network': '#3b82f6',
    'operating-system': '#8b5cf6',
    'spring': '#ec4899',
};

function generateGraphData() {
    const categories = fs.readdirSync(contentDirectory).filter(item => {
        return fs.statSync(path.join(contentDirectory, item)).isDirectory();
    });

    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    categories.forEach(categoryDir => {
        const categorySlug = categoryDirToSlug[categoryDir] || categoryDir.toLowerCase();
        const categoryPath = path.join(contentDirectory, categoryDir);
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

        files.forEach(file => {
            const slug = file.replace(/\.md$/, '');
            const fullPath = path.join(categoryPath, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            const nodeId = `${categorySlug}/${slug}`;
            const node = {
                id: nodeId,
                slug: slug,
                category: categorySlug,
                title: data.subtopic || slug,
                color: categoryColors[categorySlug] || '#6b7280',
                related: data.related || [],
                prerequisites: data.prerequisites || [],
            };

            nodes.push(node);
            nodeMap.set(slug, nodeId);
            nodeMap.set(nodeId, nodeId);
        });
    });

    nodes.forEach(node => {
        node.related.forEach(relatedSlug => {
            const targetId = nodeMap.get(relatedSlug);
            if (targetId && targetId !== node.id) {
                const existingLink = links.find(
                    l => (l.source === node.id && l.target === targetId) ||
                         (l.source === targetId && l.target === node.id)
                );
                if (!existingLink) {
                    links.push({
                        source: node.id,
                        target: targetId,
                        type: 'related',
                    });
                }
            }
        });

        node.prerequisites.forEach(prereqSlug => {
            const targetId = nodeMap.get(prereqSlug);
            if (targetId && targetId !== node.id) {
                links.push({
                    source: targetId,
                    target: node.id,
                    type: 'prerequisite',
                });
            }
        });
    });

    const graphData = {
        nodes: nodes.map(n => ({
            id: n.id,
            slug: n.slug,
            category: n.category,
            title: n.title,
            color: n.color,
        })),
        links: links,
        categories: Object.entries(categoryColors).map(([id, color]) => ({
            id,
            color,
            name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        })),
    };

    fs.writeFileSync(
        path.join(publicDirectory, 'graph-data.json'),
        JSON.stringify(graphData)
    );

    console.log(`Graph data generated: ${nodes.length} nodes, ${links.length} links`);
}

generateGraphData();
