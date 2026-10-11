import { setRequestLocale } from "next-intl/server";
import { Audience } from "@/components/Audience";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pilot } from "@/components/Pilot";
import { Pricing } from "@/components/Pricing";
import { Sample } from "@/components/Sample";
import { Features, Formats, How, Problem, Proof, Quality, Strip } from "@/components/Sections";
import { StructuredData } from "@/components/StructuredData";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Strip />
        <Problem />
        <Audience />
        <How />
        <Quality />
        <Features />
        <Formats />
        <Proof />
        <Pricing />
        <Pilot />
        <Faq />
        <Sample />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
