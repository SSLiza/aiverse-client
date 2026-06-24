import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReview";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedPrompts/>
      <WhyChooseUs/>
      <CustomerReviews/>
    </div>
  );
}
