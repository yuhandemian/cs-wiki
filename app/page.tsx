import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">CS Wiki</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        106개 큐레이션 CS 문서로 구성된 학습 효율 극대화 Wiki
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 카테고리 카드 */}
        <CategoryCard
          title="Algorithm"
          count={12}
          href="/wiki/algorithm"
          color="bg-blue-500"
        />
        <CategoryCard
          title="Data Structure"
          count={3}
          href="/wiki/data-structure"
          color="bg-green-500"
        />
        <CategoryCard
          title="Operating System"
          count={20}
          href="/wiki/operating-system"
          color="bg-purple-500"
        />
        <CategoryCard
          title="Database"
          count={17}
          href="/wiki/database"
          color="bg-yellow-500"
        />
        <CategoryCard
          title="Network"
          count={16}
          href="/wiki/network"
          color="bg-red-500"
        />
        <CategoryCard
          title="Java"
          count={18}
          href="/wiki/java"
          color="bg-orange-500"
        />
        <CategoryCard
          title="Spring"
          count={15}
          href="/wiki/spring"
          color="bg-pink-500"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">주요 기능</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>🔍 빠른 문서 탐색</li>
          <li>🧠 구조적 이해를 위한 개념 그래프</li>
          <li>🔗 개념 간 연결 시각화</li>
          <li>📚 106개 고품질 큐레이션 문서</li>
        </ul>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  count,
  href,
  color,
}: {
  title: string;
  count: number;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-lg`} />
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-500">{count}개 문서</p>
        </div>
      </div>
    </Link>
  );
}
