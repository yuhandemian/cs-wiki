'use client';

import Link from "next/link";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-4">CS Wiki</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          컴퓨터 과학 개념을 한눈에
        </p>
        
        <div className="max-w-2xl mx-auto mb-6">
          <Search />
        </div>

        <Link 
          href="/graph"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          개념 그래프 보기
        </Link>
      </div>

      <div className="px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">카테고리별 탐색</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CategoryCard
            title="Algorithm"
            count={12}
            href="/wiki/algorithm"
            color="bg-blue-500"
            description="정렬, 탐색, 그래프"
          />
          <CategoryCard
            title="Data Structure"
            count={3}
            href="/wiki/data-structure"
            color="bg-green-500"
            description="배열, 트리, 해시"
          />
          <CategoryCard
            title="Database"
            count={17}
            href="/wiki/database"
            color="bg-yellow-500"
            description="SQL, 트랜잭션, 인덱스"
          />
          <CategoryCard
            title="Operating System"
            count={20}
            href="/wiki/operating-system"
            color="bg-purple-500"
            description="프로세스, 메모리, 동기화"
          />
          <CategoryCard
            title="Network"
            count={16}
            href="/wiki/network"
            color="bg-red-500"
            description="HTTP, TCP/IP, 보안"
          />
          <CategoryCard
            title="Java"
            count={18}
            href="/wiki/java"
            color="bg-orange-500"
            description="JVM, 컬렉션, 동시성"
          />
          <CategoryCard
            title="Spring"
            count={15}
            href="/wiki/spring"
            color="bg-pink-500"
            description="IoC, AOP, MVC"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">97</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">문서</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">카테고리</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">104</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">연결</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  count,
  href,
  color,
  description,
}: {
  title: string;
  count: number;
  href: string;
  color: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 border rounded-xl hover:shadow-xl hover:border-blue-500 transition-all bg-white dark:bg-gray-800"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${color} rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform`} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description}</p>
          <p className="text-xs text-gray-400">{count}개 문서</p>
        </div>
      </div>
    </Link>
  );
}
