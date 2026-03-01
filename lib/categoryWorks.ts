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
    name: "ภาษาไทย",
    slug: "thai",
    folder: "Thai",
    description: "Language, literature, and cultural studies",
    works: [],
  },
  {
    name: "ภาษาอังกฤษ",
    slug: "english",
    folder: "English",
    description: "Communication, reading, and language mastery",
    works: [],
  },
  {
    name: "คณิตศาสตร์",
    slug: "mathematics",
    folder: "Mathematics",
    description: "Problem solving through numbers and logic",
    works: [],
  },
  {
    name: "ฟิสิกส์",
    slug: "physics",
    folder: "Physics",
    description: "Understanding the laws of the physical world",
    works: [],
  },
  {
    name: "เคมี",
    slug: "chemistry",
    folder: "Chemistry",
    description: "Exploring matter, molecules, and reactions",
    works: [],
  },
  {
    name: "ชีววิทยา",
    slug: "biology",
    folder: "Biology",
    description: "Life sciences and biological systems",
    works: [],
  },
  {
    name: "คอมพิวเตอร์",
    slug: "computer",
    folder: "Computer",
    description: "Programming, systems, and digital creation",
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
  ภาษาไทย: "thai",
  ภาษาอังกฤษ: "english",
  คณิตศาสตร์: "mathematics",
  ฟิสิกส์: "physics",
  เคมี: "chemistry",
  ชีววิทยา: "biology",
  คอมพิวเตอร์: "computer",
};
