import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import lunr from 'lunr';

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

function getAllDocuments() {
    const categories = fs.readdirSync(contentDirectory).filter(item => {
        return fs.statSync(path.join(contentDirectory, item)).isDirectory();
    });

    const documents = [];

    categories.forEach(categoryDir => {
        const categorySlug = categoryDirToSlug[categoryDir] || categoryDir.toLowerCase();
        const categoryPath = path.join(contentDirectory, categoryDir);
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

        files.forEach(file => {
            const slug = file.replace(/\.md$/, '');
            const fullPath = path.join(categoryPath, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            documents.push({
                id: `${categorySlug}/${slug}`,
                category: categorySlug,
                slug: slug,
                title: data.subtopic || slug,
                tags: (data.tags || []).join(' '),
                content: content.substring(0, 5000),
            });
        });
    });

    return documents;
}

function generateSearchIndex() {
    const documents = getAllDocuments();

    const idx = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('tags', { boost: 5 });
        this.field('category', { boost: 3 });
        this.field('content');

        documents.forEach(doc => {
            this.add(doc);
        });
    });

    const searchData = {
        index: idx.toJSON(),
        documents: documents.map(doc => ({
            id: doc.id,
            category: doc.category,
            slug: doc.slug,
            title: doc.title,
            tags: doc.tags,
        })),
    };

    if (!fs.existsSync(publicDirectory)) {
        fs.mkdirSync(publicDirectory, { recursive: true });
    }

    fs.writeFileSync(
        path.join(publicDirectory, 'search-index.json'),
        JSON.stringify(searchData)
    );

    console.log(`Search index generated with ${documents.length} documents`);
}

generateSearchIndex();
