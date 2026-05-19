import AllProducts from "@/components/main/Home/AllProducts";
import Banner from "@/components/main/Home/Banner";
import CategorySection from "@/components/main/Home/CategorySection";
import Slider from "@/components/main/Home/Slider";
import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";

const page = async () => {
  await connectDB();
  const dbProducts = await Product.find().lean();
  const mappedProducts = dbProducts.map((p) => ({
    id: p._id?.toString(),
    title: p.title,
    price: p.price,
    oldPrice: p.oldPrice,
    imageSrc:
      p.images && p.images.length > 0 ? p.images[0] : "/placeholder-image.jpg",
    category: p.category,
    rating: 5.0,
    isNew: true,
    discount: p.oldPrice
      ? Math.floor(((p.oldPrice - p.price) / p.oldPrice) * 100)
      : 0,
  }));
  return (
    <div>
      <Banner />
      <Slider />
      <CategorySection />
      <AllProducts products={mappedProducts} />
    </div>
  );
};

export default page;
