import Link from 'next/link';
import { categorySlugToDir, getInterviewQuestionsByCategory } from '@/lib/interview';

// 카테고리별 UI 메타데이터 (CS Wiki 기반)
const categoryMeta: Record<string, { desc: string }> = {
    'Algorithm': { desc: '정렬, 탐색, 그래프' },
    'Operating-System': { desc: '프로세스, 메모리, 동기화' },
    'Spring': { desc: 'IOC, AOP, MVC' },
    'Data-Structure': { desc: '배열, 트리, 해시' },
    'Network': { desc: 'HTTP, TCP/IP, 보안' },
    'Database': { desc: 'SQL, 트랜잭션, 인덱스' },
    'Java': { desc: 'JVM, 컬렉션, 동시성' }
};

export default function InterviewDashboard() {
    const rawCategories = Object.keys(categorySlugToDir); 

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">기술 면접 질문 은행</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    CS 핵심 개념을 실제 면접 환경에 대비해 암기하고 확인하세요
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rawCategories.map((slug) => {
                    const dirName = categorySlugToDir[slug];
                    const meta = categoryMeta[dirName] || { desc: 'CS 연관 지식' };
                    const questionsCount = getInterviewQuestionsByCategory(slug).length;

                    return (
                        <Link
                            key={slug}
                            href={`/interview/${slug}`}
                            className="block p-7 border rounded-2xl hover:shadow-xl hover:border-blue-500 transition-all bg-white dark:bg-gray-800 group relative overflow-hidden"
                        >
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{dirName}</h2>
                            <p className="text-gray-600 dark:text-gray-300 font-medium mb-6 h-6">{meta.desc}</p>
                            
                            <div className="flex items-center text-sm pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="text-blue-600 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1.5 rounded-md transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    면접 질문: <span className="font-bold">{questionsCount}개 수록</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
