import { Metadata } from 'next';
import CategoryClientPage from './category-client';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const categoryName = params.slug === "all" ? "All Products" : params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
    const dummyTitle = `${categoryName} Collection - Premium Apparel`;
    const dummyDesc = `Explore our exclusive ${categoryName} collection. Shop high-quality pieces tailored for modern streetwear and luxury aesthetics.`;

    return {
        title: dummyTitle,
        description: dummyDesc,
        openGraph: {
            title: dummyTitle,
            description: dummyDesc,
        },
        alternates: {
            canonical: `/category/${params.slug}`,
        }
    };
}

export default function Page({ params }: { params: { slug: string } }) {
    return <CategoryClientPage params={params} />;
}
