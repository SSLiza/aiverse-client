import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReview";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import PlatformStats from "@/components/PlatformStats";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedPrompts/>
      <WhyChooseUs/>
      <CustomerReviews/>
      <PlatformStats/>
    </div>
  );
}
