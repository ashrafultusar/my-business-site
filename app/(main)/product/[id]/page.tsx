import { Metadata } from 'next';
import ProductDetailsPage from './product-client';
import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

// Generate SEO metadata dynamically based on the product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id).lean();

    if (!product) {
        return { title: 'Product Not Found' };
    }

    const titleStr = `${product.title} | Premium Store`;
    const descStr = product.description || "Discover our exclusive collection of premium streetwear and luxury apparel.";

    return {
        title: titleStr,
        description: descStr,
        openGraph: {
            title: titleStr,
            description: descStr,
            images: product.images && product.images.length > 0 ? [product.images[0]] : ['/assets/image.jpg'],
        },
        alternates: {
            canonical: `/product/${id}`,
        }
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectDB();
    const dbProduct = await Product.findById(id).lean();

    if (!dbProduct) {
        notFound();
    }

    const dbRelated = await Product.find({
        category: dbProduct.category,
        _id: { $ne: dbProduct._id }
    }).limit(4).lean();

    // Map to structure 
    const mapProduct = (p: any) => ({
        id: p._id.toString(),
        title: p.title,
        price: p.price,
        oldPrice: p.oldPrice,
        imageSrc: (p.images && p.images.length > 0) ? p.images[0] : "/placeholder-image.jpg",
        images: p.images,
        category: p.category,
        rating: 5.0,
        isNew: p.isNew || true,
        discount: p.oldPrice ? Math.floor(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0,
        description: p.description,
        sizes: p.sizes,
        inStock: p.inStock,
        sku: p._id.toString().slice(-6).toUpperCase(), // simple dummy SKU
        reviews: 0
    });

    const mappedProduct = mapProduct(dbProduct);
    const mappedRelated = dbRelated.map(mapProduct);

    return <ProductDetailsPage product={mappedProduct} relatedProducts={mappedRelated} />;
}
