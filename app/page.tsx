import CustomCursorLoader from "@/components/CustomCursorLoader";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("@/components/Marquee"));
const SectionHeader = dynamic(() => import("@/components/SectionHeader"));
const WorkGallery = dynamic(() => import("@/components/WorkGallery"));
const StatsBar = dynamic(() => import("@/components/StatsBar"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

const servicesMarquee = [
  "Branding",
  "UI Design",
  "Art Direction",
  "Typography",
  "Motion",
  "Illustration",
];

const ctaMarquee = [
  "Let's Collaborate",
  "Open for Projects",
  "Say Hello",
  "Let's Create",
];

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursorLoader />
      <Navbar />
      <Hero />
      <Marquee items={servicesMarquee} direction="left" speed={25} />
      <SectionHeader number="01" title="Selected" serifWord="Work" />
      <WorkGallery />
      <StatsBar />
      <SectionHeader number="02" title="About" serifWord="Me" />
      <About />
      <Marquee items={ctaMarquee} direction="right" speed={25} />
      <Contact />
      <Footer />
    </SmoothScroll>
  );
}
