import CategoryNavbar from "@/components/CategoryNavbar";
import CustomCursorLoader from "@/components/CustomCursorLoader";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { getAllCategorySlugs, getCategoryBySlug } from "@/lib/categoryWorks";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const CategoryWorkGallery = dynamic(
  () => import("@/components/CategoryWorkGallery"),
);

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} — THATT` : "Work — THATT",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <SmoothScroll>
      <CustomCursorLoader />
      <CategoryNavbar categoryName={category.name} />
      <CategoryWorkGallery category={category} />
      <Footer />
    </SmoothScroll>
  );
}
