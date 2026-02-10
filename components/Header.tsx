import Link from "next/link";
import Search from "./Search";

export default function Header() {
    return (
        <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <h1 className="text-xl font-bold">CS Wiki</h1>
                        </Link>
                        <Link href="/graph" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Graph
                        </Link>
                    </div>
                    <Search />
                </div>
            </div>
        </header>
    );
}
