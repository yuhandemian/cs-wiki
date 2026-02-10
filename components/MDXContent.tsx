import { MDXRemote } from 'next-mdx-remote/rsc';
import { DocumentMetadata, getDocumentsByCategory, getDocument } from '@/lib/mdx';
import Link from 'next/link';

interface MDXContentProps {
    content: string;
    metadata: DocumentMetadata;
    categorySlug: string;
    currentSlug: string;
}

// 커스텀 컴포넌트
const components = {
    h1: (props: any) => (
        <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
    ),
    p: (props: any) => <p className="mb-4 leading-7" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
    li: (props: any) => <li className="ml-4" {...props} />,
    code: (props: any) => {
        const { className, children } = props;
        const isInline = !className;

        if (isInline) {
            return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                </code>
            );
        }

        return (
            <code className={`block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto ${className}`}>
                {children}
            </code>
        );
    },
    pre: (props: any) => (
        <pre className="mb-4 overflow-x-auto" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-300" {...props} />
    ),
    a: (props: any) => (
        <Link href={props.href} className="text-blue-500 hover:underline" {...props} />
    ),
    hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
    table: (props: any) => (
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300" {...props} />
        </div>
    ),
    th: (props: any) => (
        <th className="border border-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold" {...props} />
    ),
    td: (props: any) => (
        <td className="border border-gray-300 px-4 py-2" {...props} />
    ),
};

export default function MDXContent({ content, metadata, categorySlug, currentSlug }: MDXContentProps) {
    // 관련 문서 찾기
    const relatedDocs = metadata.related?.map((relatedSlug) => {
        const doc = getDocument(categorySlug, relatedSlug);
        return doc ? { ...doc, displaySlug: relatedSlug } : null;
    }).filter(Boolean) || [];

    // 선행 개념 찾기
    const prerequisiteDocs = metadata.prerequisites?.map((prereqSlug) => {
        const doc = getDocument(categorySlug, prereqSlug);
        return doc ? { ...doc, displaySlug: prereqSlug } : null;
    }).filter(Boolean) || [];

    // 백링크 찾기 (이 문서를 참조하는 문서들)
    const allDocs = getDocumentsByCategory(categorySlug);
    const backlinks = allDocs.filter((doc) => {
        const relatedSlugs = doc.metadata.related || [];
        const prereqSlugs = doc.metadata.prerequisites || [];
        return relatedSlugs.includes(currentSlug) || prereqSlugs.includes(currentSlug);
    });

    return (
        <div className="max-w-4xl">
            {/* 메타데이터 헤더 */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Link href={`/wiki/${categorySlug}`} className="hover:underline">
                        {metadata.category}
                    </Link>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded text-xs ${metadata.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            metadata.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                        }`}>
                        {metadata.difficulty || 'medium'}
                    </span>
                    {metadata.interview_frequency && (
                        <>
                            <span>•</span>
                            <span className={`px-2 py-1 rounded text-xs ${metadata.interview_frequency === 'high' ? 'bg-purple-100 text-purple-700' :
                                    metadata.interview_frequency === 'low' ? 'bg-gray-100 text-gray-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                면접 빈도: {metadata.interview_frequency}
                            </span>
                        </>
                    )}
                </div>

                <h1 className="text-4xl font-bold mb-4">{metadata.subtopic}</h1>

                {/* Tags */}
                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {metadata.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 선행 개념 (읽기 전 필수) */}
            {prerequisiteDocs.length > 0 && (
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 rounded">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span>📚</span>
                        <span>먼저 읽어야 할 개념</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        이 문서를 이해하려면 아래 개념을 먼저 학습하는 것이 좋습니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {prerequisiteDocs.map((doc: any) => (
                            <Link
                                key={doc.slug}
                                href={`/wiki/${categorySlug}/${doc.slug}`}
                                className="block p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-blue-200"
                            >
                                <div className="font-medium text-blue-600 dark:text-blue-400">
                                    {doc.metadata.subtopic}
                                </div>
                                {doc.metadata.tags && doc.metadata.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {doc.metadata.tags.slice(0, 2).map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* MDX 콘텐츠 */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote source={content} components={components} />
            </div>

            {/* 관련 문서 */}
            {relatedDocs.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>🔗</span>
                        <span>관련 문서</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        이 개념과 함께 학습하면 좋은 문서들입니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {relatedDocs.map((doc: any) => (
                            <Link
                                key={doc.slug}
                                href={`/wiki/${categorySlug}/${doc.slug}`}
                                className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                            >
                                <h3 className="font-semibold mb-2">{doc.metadata.subtopic}</h3>
                                {doc.metadata.tags && doc.metadata.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {doc.metadata.tags.slice(0, 3).map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 백링크 (이 문서를 참조하는 문서들) */}
            {backlinks.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <span>⬅️</span>
                        <span>이 문서를 참조하는 문서</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        이 개념을 기반으로 하는 고급 주제들입니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {backlinks.map((doc) => (
                            <Link
                                key={doc.slug}
                                href={`/wiki/${categorySlug}/${doc.slug}`}
                                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                            >
                                {doc.metadata.subtopic}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
