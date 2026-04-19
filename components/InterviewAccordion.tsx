'use client';

import { useState } from 'react';

interface InterviewAccordionProps {
    title: string;
    difficulty: string;
    frequency: string;
    children: React.ReactNode;
}

export default function InterviewAccordion({
    title,
    difficulty,
    frequency,
    children
}: InterviewAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden print:border-none print:mb-8 print:break-inside-avoid">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex gap-4 justify-between items-start print:hidden"
            >
                <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${difficulty === 'beginner' ? 'bg-green-100 text-green-700' : difficulty === 'advanced' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {difficulty === 'beginner' ? '초급' : difficulty === 'advanced' ? '고급' : '중급'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${frequency === 'high' ? 'bg-purple-100 text-purple-700' : frequency === 'low' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>
                            빈출: {frequency === 'high' ? '상' : frequency === 'low' ? '하' : '중'}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug">{title}</h3>
                </div>
                <div className="mt-2">
                    <svg className={`w-6 h-6 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Print fallback header */}
            <div className="hidden print:block mb-3 border-b-2 border-black pb-2">
                <div className="flex gap-2 mb-1">
                    <span className="font-bold border px-1 text-xs">난이도: {difficulty}</span>
                    <span className="font-bold border px-1 text-xs">빈출: {frequency}</span>
                </div>
                <h3 className="text-xl font-bold">Q. {title}</h3>
            </div>

            <div className={`px-6 py-4 border-t print:border-none print:px-0 print:py-2 print:block ${isOpen ? 'block' : 'hidden'}`}>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
