import { getDocumentsByCategory, getAllCategories } from '@/lib/mdx';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 정적 빌드를 위한 경로 생성
export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        category: category,
    }));
}

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const documents = getDocumentsByCategory(category);

    if (documents.length === 0) {
        notFound();
    }

    // 카테고리 이름 포맷팅
    const categoryName = category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // 난이도별 그룹화 (difficulty가 없는 문서는 'unspecified'로 분류)
    const groupedByDifficulty = {
        easy: documents.filter((doc) => doc.metadata.difficulty === 'easy'),
        medium: documents.filter((doc) => doc.metadata.difficulty === 'medium'),
        hard: documents.filter((doc) => doc.metadata.difficulty === 'hard'),
        unspecified: documents.filter((doc) => !doc.metadata.difficulty),
    };

    return (
        <div className="max-w-6xl">
            <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                총 {documents.length}개 문서
            </p>

            {/* 전체 문서 목록 */}
            <div className="space-y-8">
                {/* Easy */}
                {groupedByDifficulty.easy.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
                                Easy
                            </span>
                            <span className="text-gray-500 text-lg">
                                ({groupedByDifficulty.easy.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupedByDifficulty.easy.map((doc) => (
                                <DocumentCard
                                    key={doc.slug}
                                    category={category}
                                    document={doc}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Medium */}
                {groupedByDifficulty.medium.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                                Medium
                            </span>
                            <span className="text-gray-500 text-lg">
                                ({groupedByDifficulty.medium.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupedByDifficulty.medium.map((doc) => (
                                <DocumentCard
                                    key={doc.slug}
                                    category={category}
                                    document={doc}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Hard */}
                {groupedByDifficulty.hard.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">
                                Hard
                            </span>
                            <span className="text-gray-500 text-lg">
                                ({groupedByDifficulty.hard.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupedByDifficulty.hard.map((doc) => (
                                <DocumentCard
                                    key={doc.slug}
                                    category={category}
                                    document={doc}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Unspecified (difficulty 메타데이터가 없는 문서) */}
                {groupedByDifficulty.unspecified.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                All Documents
                            </span>
                            <span className="text-gray-500 text-lg">
                                ({groupedByDifficulty.unspecified.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupedByDifficulty.unspecified.map((doc) => (
                                <DocumentCard
                                    key={doc.slug}
                                    category={category}
                                    document={doc}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DocumentCard({
    category,
    document,
}: {
    category: string;
    document: any;
}) {
    return (
        <Link
            href={`/wiki/${category}/${document.slug}`}
            className="block p-4 border rounded-lg hover:shadow-lg transition-shadow"
        >
            <h3 className="text-lg font-semibold mb-2">{document.metadata.subtopic}</h3>

            {document.metadata.tags && document.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {document.metadata.tags.slice(0, 3).map((tag: string) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {document.metadata.interview_frequency && (
                <div className="mt-2">
                    <span
                        className={`text-xs px-2 py-1 rounded ${document.metadata.interview_frequency === 'high'
                            ? 'bg-purple-100 text-purple-700'
                            : document.metadata.interview_frequency === 'low'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                    >
                        면접 빈도: {document.metadata.interview_frequency}
                    </span>
                </div>
            )}
        </Link>
    );
}
