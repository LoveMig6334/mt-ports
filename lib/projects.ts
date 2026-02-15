export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  imageFull: string;
  aspectRatio?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Neon Flux",
    category: "Branding / Visual Identity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=90",
    aspectRatio: "16/10",
  },
  {
    id: 2,
    title: "Prism UI Kit",
    category: "UI / UX Design",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1800&q=90",
  },
  {
    id: 3,
    title: "Solstice Mag",
    category: "Art Direction",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1800&q=90",
  },
  {
    id: 4,
    title: "Vortex Series",
    category: "Typography / Poster",
    image: "https://images.unsplash.com/photo-1633218388467-539651dcf81a?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1633218388467-539651dcf81a?w=1800&q=90",
    aspectRatio: "16/10",
  },
  {
    id: 5,
    title: "RetroWave Co.",
    category: "Branding / Packaging",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800&q=90",
  },
  {
    id: 6,
    title: "Chromatic Labs",
    category: "Motion / Identity",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&q=80",
    imageFull: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1800&q=90",
  },
];
