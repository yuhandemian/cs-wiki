import Link from "next/link";
import Search from "./Search";

export default function Header() {
    return (
        <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <h1 className="text-xl font-bold">CS Wiki</h1>
                    </Link>
                    <Search />
                </div>
            </div>
        </header>
    );
}
