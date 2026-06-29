import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReview";
import FaqSection from "@/components/FaqSection";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import PlatformStats from "@/components/PlatformStats";
import TopCreators from "@/components/TopCreators";
import WhyChooseUs from "@/components/WhyChooseUs";
import AiToolsShowcase from "@/components/AiToolsShowcase";
import CommunitySection from "@/components/CommunitySection";
import ReviewSection from "@/components/ReviewSection";

export default function Home() {
  return (
    <div className="space-y-4">
      <Banner />
      <AiToolsShowcase />
      <FeaturedPrompts />
      <CustomerReviews />
      <WhyChooseUs />
      <TopCreators />
      <PlatformStats />
      <FaqSection />
      <CommunitySection />
    </div>
  );
}
