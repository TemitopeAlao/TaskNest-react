import "../css/global.css";
import "../css/landing.css";
import "../css/nav.css";
import "../css/toggle.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import PricingPlan from "../components/PricingPlan";
import HowItWorks from "../components/HowItWorks";

function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <PricingPlan />
      <HowItWorks />

      <Footer />
    </>
  );
}

export default Landing;
