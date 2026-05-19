import { Metadata } from "next";
import CategoryClientPage from "./category-client";
import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import Product from "@/models/Product";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const categoryName =
    decodedSlug === "all"
      ? "All Products"
      : decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1);
  const dummyTitle = `${categoryName} Collection - Premium Apparel`;
  const dummyDesc = `Explore our exclusive ${categoryName} collection.`;

  return {
    title: dummyTitle,
    description: dummyDesc,
    openGraph: { title: dummyTitle, description: dummyDesc },
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug); // URL decode fixed here
  const { q } = (await searchParams) || {};
  const searchString = typeof q === 'string' ? q : '';

  await connectDB();

  const dbCategories = await Category.find({}).lean();
  const categories = dbCategories.map((cat) => ({
    id: cat._id.toString(),
    title: cat.title,
    slug: cat.title.toLowerCase(),
  }));

  let dbProducts;
  let categoryTitle = decodedSlug;

  let baseQuery: any = {};

  if (decodedSlug !== "all") {
    const categoryMatch = await Category.findOne({
      title: { $regex: new RegExp(`^${decodedSlug}$`, "i") },
    });
    if (categoryMatch) {
      categoryTitle = categoryMatch.title;
      baseQuery.category = categoryTitle;
    } else {
      baseQuery.category = decodedSlug;
    }
  }

  if (searchString) {
    baseQuery.$or = [
      { title: { $regex: searchString, $options: "i" } },
      { description: { $regex: searchString, $options: "i" } },
      { category: { $regex: searchString, $options: "i" } },
    ];
  }

  dbProducts = await Product.find(baseQuery).lean();

  const products = dbProducts.map((prod: any) => ({
    id: prod._id.toString(),
    title: prod.title,
    price: prod.price,
    oldPrice: prod.oldPrice || null,
    imageSrc: prod.images && prod.images.length > 0 ? prod.images[0] : "",
    images: prod.images || [],
    rating: 5,
    isNew: !!prod.isNew,
    discount: prod.oldPrice
      ? Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)
      : 0,
    category: typeof prod.category === "string" ? prod.category.toLowerCase() : prod.category,
  }));

  return (
    <CategoryClientPage
      slug={decodedSlug}
      initialProducts={products}
      categories={categories}
      searchQuery={searchString}
    />
  );
}