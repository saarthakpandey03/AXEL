import Navbar from "../components/navbar/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/features/Features";
import Workflow from "../components/workflow/Workflow";
import Comparison from "../components/comparison/Comparison";
import LiveDemo from "../components/demo/LiveDemo";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Comparison />
      <LiveDemo />
      <CTA />
      <Footer />
    </>
  );
}