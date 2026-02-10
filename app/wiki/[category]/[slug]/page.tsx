import { getDocument, getAllDocumentPaths } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
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
        <MDXContent
            content={document.content}
            metadata={document.metadata}
            categorySlug={category}
            currentSlug={slug}
        />
    );
}
