export interface CategoryWork {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  images: string[];
  aspectRatio?: string;
}

export interface Category {
  name: string;
  slug: string;
  folder: string;
  description: string;
  works: CategoryWork[];
}

export const categories: Category[] = [
  {
    name: "Brand Identity",
    slug: "brand-identity",
    folder: "Brand Identity",
    description: "Visual identities that define and distinguish",
    works: [],
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    folder: "UI-UX Design",
    description: "Interfaces that delight and perform",
    works: [],
  },
  {
    name: "Typography",
    slug: "typography",
    folder: "Typography",
    description: "Letterforms that speak volumes",
    works: [],
  },
  {
    name: "Art Direction",
    slug: "art-direction",
    folder: "Art Direction",
    description: "Creative vision brought to life",
    works: [],
  },
  {
    name: "Motion Design",
    slug: "motion-design",
    folder: "Motion Design",
    description: "Movement that captures attention",
    works: [],
  },
  {
    name: "Editorial",
    slug: "editorial",
    folder: "Editorial",
    description: "Publications crafted with care",
    works: [],
  },
  {
    name: "Illustration",
    slug: "illustration",
    folder: "Illustration",
    description: "Visual stories drawn by hand",
    works: [],
  },
  {
    name: "Packaging",
    slug: "packaging",
    folder: "Packaging",
    description: "Unboxing experiences that matter",
    works: [],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export const skillToSlug: Record<string, string> = {
  "Brand Identity": "brand-identity",
  "UI/UX Design": "ui-ux-design",
  Typography: "typography",
  "Art Direction": "art-direction",
  "Motion Design": "motion-design",
  Editorial: "editorial",
  Illustration: "illustration",
  Packaging: "packaging",
};
