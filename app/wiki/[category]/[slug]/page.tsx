import { getDocument, getAllDocumentPaths } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import MiniGraph from '@/components/MiniGraph';
import { notFound } from 'next/navigation';

interface DocumentPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const paths = getAllDocumentPaths();
    return paths.map((path) => ({
        category: path.category,
        slug: path.slug,
    }));
}

export default async function DocumentPage({ params }: DocumentPageProps) {
    const { category, slug } = await params;
    const document = getDocument(category, slug);

    if (!document) {
        notFound();
    }

    return (
        <div className="flex gap-8">
            <div className="flex-1 min-w-0">
                <MDXContent
                    content={document.content}
                    metadata={document.metadata}
                    categorySlug={category}
                    currentSlug={slug}
                />
            </div>
            <aside className="hidden xl:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                    <MiniGraph currentSlug={slug} categorySlug={category} />
                </div>
            </aside>
        </div>
    );
}
