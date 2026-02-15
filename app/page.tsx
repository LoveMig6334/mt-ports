"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import WorkGallery from "@/components/WorkGallery";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

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
      <CustomCursor />
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
