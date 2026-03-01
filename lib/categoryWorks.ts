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
    works: [
      {
        id: "love-poem",
        title: "กลอนความรัก",
        description:
          "A traditional Thai poetry assignment exploring themes of love and longing through classical verse forms, demonstrating mastery of กลอนสุภาพ meter and lyrical expression in the Thai literary tradition.",
        thumbnail: "/category/Thai/love-poem/1.png",
        images: ["/category/Thai/love-poem/1.png"],
      },
    ],
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
    works: [
      {
        id: "math-work",
        title: "ชิ้นงานคณิตศาสตร์",
        description:
          "A mathematics assignment showcasing problem-solving skills and analytical thinking through structured exercises in core mathematical concepts.",
        thumbnail: "/category/Mathematics/math-work/1.png",
        images: ["/category/Mathematics/math-work/1.png"],
      },
      {
        id: "math-work-extra",
        title: "ชิ้นงานคณิตศาสตร์ เพิ่มเติม",
        description:
          "An extended mathematics assignment exploring additional topics beyond the core curriculum, demonstrating initiative and deeper engagement with advanced problem-solving techniques.",
        thumbnail: "/category/Mathematics/math-work-extra/1.png",
        images: ["/category/Mathematics/math-work-extra/1.png"],
      },
    ],
  },
  {
    name: "ฟิสิกส์",
    slug: "physics",
    folder: "Physics",
    description: "Understanding the laws of the physical world",
    works: [
      {
        id: "free-fall",
        title: "การทดลองการตกแบบอิสระ",
        description:
          "An experimental study of free-fall motion, measuring the acceleration due to gravity by analyzing an object in free fall — demonstrating core principles of kinematics and Newton's laws of motion.",
        thumbnail: "/category/Physics/free-fall/1.jpg",
        images: ["/category/Physics/free-fall/1.jpg"],
      },
    ],
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
  {
    name: "สังคมศึกษา",
    slug: "social-studies",
    folder: "SocialStudies",
    description: "History, geography, civics, and social sciences",
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
  สังคมศึกษา: "social-studies",
};
