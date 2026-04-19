import { getInterviewQuestionsByCategory, categorySlugToDir } from '@/lib/interview';
import InterviewAccordion from '@/components/InterviewAccordion';
import PrintButton from '@/components/PrintButton';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    const categories = Object.keys(categorySlugToDir);
    return categories.map((c) => ({
        category: c.toLowerCase(),
    }));
}

export default async function InterviewCategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    
    // categorySlug might be lowercased, let's normalize
    const questions = getInterviewQuestionsByCategory(category);
    const displayName = categorySlugToDir[category] || category;

    // MDX 컴포넌트 커스터마이징 (면접 질문에 최적화)
    const components = {
        h2: (props: any) => <h2 className="text-lg font-bold mt-4 mb-2 text-blue-600 dark:text-blue-400" {...props} />,
        p: (props: any) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]" {...props} />,
        ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-[15px] text-gray-700 dark:text-gray-300" {...props} />,
        li: (props: any) => <li className="pl-2" {...props} />,
        strong: (props: any) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 print:hidden">
                <div>
                    <Link href="/interview" className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block">
                        ← 전체 면접 은행
                    </Link>
                    <h1 className="text-3xl font-bold">{displayName} 기술 면접 분석</h1>
                </div>
                <PrintButton />
            </div>

            {/* Print Header */}
            <div className="hidden print:block mb-8 text-center border-b-4 border-black pb-4">
                <h1 className="text-3xl font-bold mb-2">기술 면접 대비 핵심 질문</h1>
                <h2 className="text-xl text-gray-800">카테고리: {displayName}</h2>
            </div>

            <div className="space-y-4 print:space-y-8">
                {questions.map((q) => (
                    <InterviewAccordion
                        key={q.slug}
                        title={q.metadata.title}
                        difficulty={q.metadata.difficulty}
                        frequency={q.metadata.frequency}
                    >
                        <MDXRemote source={q.content} components={components} />
                    </InterviewAccordion>
                ))}
                
                {questions.length === 0 && (
                    <div className="text-center text-gray-500 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        이 카테고리에는 아직 등록된 면접 질문이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
