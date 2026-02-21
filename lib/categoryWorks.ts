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
    works: [
      {
        id: "vortex-type-series",
        title: "Vortex Type Series",
        description: "Experimental poster series exploring kinetic typography",
        thumbnail: "/category/Typography/vortex-type-series/1.jpg",
        images: [
          "/category/Typography/vortex-type-series/1.jpg",
          "/category/Typography/vortex-type-series/2.jpg",
          "/category/Typography/vortex-type-series/3.jpg",
        ],
        aspectRatio: "16/10",
      },
      {
        id: "mono-glyphs",
        title: "Mono Glyphs",
        description: "Monospaced typeface design for digital interfaces",
        thumbnail: "/category/Typography/mono-glyphs/1.jpg",
        images: [
          "/category/Typography/mono-glyphs/1.jpg",
          "/category/Typography/mono-glyphs/2.jpg",
        ],
      },
    ],
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
