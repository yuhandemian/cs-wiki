import Link from "next/link";
import Search from "./Search";

export default function Header() {
    return (
        <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <h1 className="text-xl font-bold">CS Wiki</h1>
                        </Link>
                        <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
                        <Link 
                            href="/interview" 
                            className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all flex items-center gap-1.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            기술면접 은행
                        </Link>
                    </div>
                    <Search />
                </div>
            </div>
        </header>
    );
}
