import HowItWorksSection from "@/screens/commonMainDetailsPage/component/howItWorks";
import FeaturesSection from "@/screens/commonMainDetailsPage/component/featureSection";
import FAQSection from "@/screens/commonMainDetailsPage/component/faqSection";
import ObiterDetails from "@/screens/commonMainDetailsPage/component/obiterDetails";
import OurMethodology from "./component/ourMethodology";
import BeginPractice from "./component/beginPractice";

const CommonMainDetails = () => {
  return (
    <>
      <ObiterDetails />
      <HowItWorksSection />
      <FeaturesSection />
      <OurMethodology/>
      <FAQSection />
      <BeginPractice/>
    </>
  );
};

export default CommonMainDetails;
