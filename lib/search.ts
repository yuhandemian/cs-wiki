import { getAllCategories, getDocumentsByCategory, Document } from '@/lib/mdx';

export interface SearchResult {
    document: Document;
    category: string;
    score: number;
}

export function searchAllDocuments(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    const categories = getAllCategories();
    const results: SearchResult[] = [];

    categories.forEach((category) => {
        const documents = getDocumentsByCategory(category);

        documents.forEach((doc) => {
            let score = 0;

            // 제목 매칭 (가장 높은 점수)
            if (doc.metadata.subtopic?.toLowerCase().includes(lowerQuery)) {
                score += 10;
            }

            // 태그 매칭
            if (doc.metadata.tags) {
                doc.metadata.tags.forEach((tag) => {
                    if (tag.toLowerCase().includes(lowerQuery)) {
                        score += 5;
                    }
                });
            }

            // 카테고리 매칭
            if (doc.metadata.category?.toLowerCase().includes(lowerQuery)) {
                score += 3;
            }

            // 콘텐츠 매칭 (낮은 점수)
            if (doc.content.toLowerCase().includes(lowerQuery)) {
                score += 1;
            }

            if (score > 0) {
                results.push({
                    document: doc,
                    category,
                    score,
                });
            }
        });
    });

    // 점수 기준 정렬
    return results.sort((a, b) => b.score - a.score);
}
