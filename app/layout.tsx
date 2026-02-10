import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CS Wiki - 컴퓨터 과학 지식 베이스",
  description: "106개 큐레이션 CS 문서로 구성된 학습 효율 극대화 Wiki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* 좌측 네비게이션 */}
          <Navigation />
          
          {/* 메인 콘텐츠 */}
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
