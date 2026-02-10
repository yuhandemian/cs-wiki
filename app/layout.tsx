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
        <div className="min-h-screen">
          <Navigation />
          
          <div 
            className="transition-all duration-300"
            style={{ paddingLeft: 'var(--sidebar-width, 0px)' }}
          >
            <Header />
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
