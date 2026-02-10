import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

// URL slug를 실제 디렉토리 이름으로 매핑
const categorySlugToDir: Record<string, string> = {
    'algorithm': 'Algorithm',
    'data-structure': 'Data-Structure',
    'database': 'Database',
    'java': 'Java',
    'network': 'Network',
    'operating-system': 'Operating-System',
    'spring': 'Spring',
};

export interface DocumentMetadata {
    category: string;
    subtopic: string;
    tags?: string[];
    related?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    prerequisites?: string[];
    interview_frequency?: 'low' | 'medium' | 'high';
    sources?: number;
    curated_by?: string;
    generated?: string;
}

export interface Document {
    slug: string;
    metadata: DocumentMetadata;
    content: string;
}

/**
 * 모든 카테고리 가져오기
 */
export function getAllCategories(): string[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const categories = fs.readdirSync(contentDirectory);
    return categories.filter((category) => {
        const categoryPath = path.join(contentDirectory, category);
        return fs.statSync(categoryPath).isDirectory();
    });
}

/**
 * 특정 카테고리의 모든 문서 가져오기
 */
export function getDocumentsByCategory(categorySlug: string): Document[] {
    // URL slug를 실제 디렉토리 이름으로 변환
    const categoryDir = categorySlugToDir[categorySlug] || categorySlug;
    const categoryPath = path.join(contentDirectory, categoryDir);

    if (!fs.existsSync(categoryPath)) {
        console.log(`[getDocumentsByCategory] Path not found: ${categoryPath}`);
        return [];
    }

    const files = fs.readdirSync(categoryPath);
    const documents = files
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const fullPath = path.join(categoryPath, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                metadata: data as DocumentMetadata,
                content,
            };
        });

    console.log(`[getDocumentsByCategory] Found ${documents.length} documents in ${categoryDir}`);
    return documents;
}

/**
 * 특정 문서 가져오기
 */
export function getDocument(categorySlug: string, slug: string): Document | null {
    // URL slug를 실제 디렉토리 이름으로 변환
    const categoryDir = categorySlugToDir[categorySlug] || categorySlug;
    const filePath = path.join(contentDirectory, categoryDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        console.log(`[getDocument] File not found: ${filePath}`);
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        metadata: data as DocumentMetadata,
        content,
    };
}

/**
 * 모든 문서 경로 가져오기 (정적 생성용)
 */
export function getAllDocumentPaths(): { category: string; slug: string }[] {
    const categories = getAllCategories();
    const paths: { category: string; slug: string }[] = [];

    categories.forEach((categoryDir) => {
        // 디렉토리 이름을 slug로 변환
        const categorySlug = Object.keys(categorySlugToDir).find(
            key => categorySlugToDir[key] === categoryDir
        ) || categoryDir.toLowerCase();

        const documents = getDocumentsByCategory(categorySlug);
        documents.forEach((doc) => {
            paths.push({
                category: categorySlug,
                slug: doc.slug,
            });
        });
    });

    return paths;
}

/**
 * 문서 검색
 */
export function searchDocuments(query: string): Document[] {
    const categories = getAllCategories();
    const allDocuments: Document[] = [];

    categories.forEach((categoryDir) => {
        const categorySlug = Object.keys(categorySlugToDir).find(
            key => categorySlugToDir[key] === categoryDir
        ) || categoryDir.toLowerCase();

        const documents = getDocumentsByCategory(categorySlug);
        allDocuments.push(...documents);
    });

    const lowerQuery = query.toLowerCase();
    return allDocuments.filter((doc) => {
        const titleMatch = doc.metadata.subtopic?.toLowerCase().includes(lowerQuery);
        const contentMatch = doc.content.toLowerCase().includes(lowerQuery);
        const tagsMatch = doc.metadata.tags?.some((tag) =>
            tag.toLowerCase().includes(lowerQuery)
        );

        return titleMatch || contentMatch || tagsMatch;
    });
}
