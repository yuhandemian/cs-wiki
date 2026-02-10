"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const categories = [
    { name: "Algorithm", slug: "algorithm", count: 12 },
    { name: "Data Structure", slug: "data-structure", count: 3 },
    { name: "Operating System", slug: "operating-system", count: 20 },
    { name: "Database", slug: "database", count: 17 },
    { name: "Network", slug: "network", count: 16 },
    { name: "Java", slug: "java", count: 18 },
    { name: "Spring", slug: "spring", count: 15 },
];

export default function Navigation() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        setIsSidebarOpen(!isHomePage);
    }, [isHomePage]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--sidebar-width', 
            isSidebarOpen ? '256px' : '64px'
        );
    }, [isSidebarOpen]);

    return (
        <>
            {/* 모바일 토글 버튼 */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 사이드바 */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
                    transition-all duration-300 ease-in-out z-40 overflow-hidden
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isSidebarOpen ? 'md:w-64' : 'md:w-16'}
                `}
            >
                {/* 접힌 사이드바의 펼치기 버튼 */}
                {!isSidebarOpen && (
                    <div className="hidden md:block pt-6 px-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            title="사이드바 표시"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                )}

                {/* 사이드바 컨텐츠 */}
                <div className={`w-64 p-6 pt-16 md:pt-6 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" className="block" onClick={() => setIsMobileOpen(false)}>
                            <h1 className="text-2xl font-bold">CS Wiki</h1>
                        </Link>
                        
                        {/* 데스크톱 닫기 버튼 */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="hidden md:block p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            title="사이드바 숨기기"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {categories.map((category) => (
                            <CategoryItem 
                                key={category.slug} 
                                category={category}
                                defaultExpanded={!isHomePage}
                                onNavigate={() => setIsMobileOpen(false)}
                            />
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 모바일 오버레이 */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}

function CategoryItem({ 
    category, 
    defaultExpanded = false,
    onNavigate 
}: { 
    category: typeof categories[0];
    defaultExpanded?: boolean;
    onNavigate: () => void;
}) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    useEffect(() => {
        setIsExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
                <span className="font-medium">{category.name}</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{category.count}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
            </button>

            {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                    <Link
                        href={`/wiki/${category.slug}`}
                        onClick={onNavigate}
                        className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        전체 보기
                    </Link>
                </div>
            )}
        </div>
    );
}
