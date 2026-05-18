import AllProducts from '@/components/main/Home/AllProducts';
import Banner from '@/components/main/Home/Banner';
import CategorySection from '@/components/main/Home/CategorySection';
import Slider from '@/components/main/Home/Slider';


const page = () => {
    return (
        <div>
            <Banner/>
            <Slider/>
            <CategorySection />
            <AllProducts/>
        </div>
    );
};

export default page;