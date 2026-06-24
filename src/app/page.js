import Banner from "@/components/Banner";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedPrompts/>
      
      <WhyChooseUs/>
    </div>
  );
}
