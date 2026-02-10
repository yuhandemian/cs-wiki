'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import lunr from 'lunr';

interface SearchDocument {
    id: string;
    category: string;
    slug: string;
    title: string;
    tags: string;
}

interface SearchData {
    index: object;
    documents: SearchDocument[];
}

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchDocument[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchData, setSearchData] = useState<SearchData | null>(null);
    const [lunrIndex, setLunrIndex] = useState<lunr.Index | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const basePath = process.env.NODE_ENV === 'production' ? '/cs-wiki' : '';
        fetch(`${basePath}/search-index.json`)
            .then(res => res.json())
            .then((data: SearchData) => {
                setSearchData(data);
                setLunrIndex(lunr.Index.load(data.index));
            })
            .catch(err => console.error('Failed to load search index:', err));
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query || query.length < 2 || !lunrIndex || !searchData) {
            setResults([]);
            return;
        }

        try {
            const searchResults = lunrIndex.search(`${query}*`);
            const docs = searchResults.slice(0, 10).map(result => {
                return searchData.documents.find(doc => doc.id === result.ref);
            }).filter(Boolean) as SearchDocument[];
            setResults(docs);
        } catch {
            setResults([]);
        }
    }, [query, lunrIndex, searchData]);

    const categoryLabels: Record<string, string> = {
        'algorithm': 'Algorithm',
        'data-structure': 'Data Structure',
        'database': 'Database',
        'java': 'Java',
        'network': 'Network',
        'operating-system': 'Operating System',
        'spring': 'Spring',
    };

    return (
        <div ref={searchRef} className="relative">
            <input
                type="text"
                placeholder="검색..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-48 md:w-64 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-1 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
                    {results.map((doc) => (
                        <Link
                            key={doc.id}
                            href={`/wiki/${doc.category}/${doc.slug}`}
                            onClick={() => {
                                setIsOpen(false);
                                setQuery('');
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-700 last:border-b-0"
                        >
                            <div className="font-medium text-sm">{doc.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {categoryLabels[doc.category] || doc.category}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {isOpen && query.length >= 2 && results.length === 0 && lunrIndex && (
                <div className="absolute top-full mt-1 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-sm text-gray-500">
                    검색 결과가 없습니다
                </div>
            )}
        </div>
    );
}
