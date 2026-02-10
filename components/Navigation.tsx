"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const categories = [
    {
        name: "Algorithm",
        slug: "algorithm",
        count: 12,
    },
    {
        name: "Data Structure",
        slug: "data-structure",
        count: 3,
    },
    {
        name: "Operating System",
        slug: "operating-system",
        count: 20,
    },
    {
        name: "Database",
        slug: "database",
        count: 17,
    },
    {
        name: "Network",
        slug: "network",
        count: 16,
    },
    {
        name: "Java",
        slug: "java",
        count: 18,
    },
    {
        name: "Spring",
        slug: "spring",
        count: 15,
    },
];

export default function Navigation() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* 모바일 메뉴 버튼 */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 네비게이션 */}
            <nav
                className={`
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          fixed md:sticky top-0 left-0 h-screen
          w-64 bg-gray-50 dark:bg-gray-900 border-r
          transition-transform duration-300 ease-in-out
          overflow-y-auto z-40
        `}
            >
                <div className="p-6">
                    <Link href="/" className="block mb-8">
                        <h1 className="text-2xl font-bold">CS Wiki</h1>
                    </Link>

                    <div className="space-y-2">
                        {categories.map((category) => (
                            <CategoryItem 
                                key={category.slug} 
                                category={category}
                                defaultExpanded={!isHomePage}
                            />
                        ))}
                    </div>
                </div>
            </nav>

            {/* 모바일 오버레이 */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}

function CategoryItem({ 
    category, 
    defaultExpanded = false 
}: { 
    category: typeof categories[0];
    defaultExpanded?: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    useEffect(() => {
        setIsExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
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
                        className="block p-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                    >
                        전체 보기
                    </Link>
                </div>
            )}
        </div>
    );
}
