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
    image: "/projects/project-1.jpg",
    imageFull: "/projects/project-1-full.jpg",
    aspectRatio: "16/10",
  },
  {
    id: 2,
    title: "Prism UI Kit",
    category: "UI / UX Design",
    image: "/projects/project-2.jpg",
    imageFull: "/projects/project-2-full.jpg",
  },
  {
    id: 3,
    title: "Solstice Mag",
    category: "Art Direction",
    image: "/projects/project-3.jpg",
    imageFull: "/projects/project-3-full.jpg",
  },
  {
    id: 4,
    title: "Vortex Series",
    category: "Typography / Poster",
    image: "/projects/project-4.jpg",
    imageFull: "/projects/project-4-full.jpg",
    aspectRatio: "16/10",
  },
  {
    id: 5,
    title: "RetroWave Co.",
    category: "Branding / Packaging",
    image: "/projects/project-5.jpg",
    imageFull: "/projects/project-5-full.jpg",
  },
  {
    id: 6,
    title: "Chromatic Labs",
    category: "Motion / Identity",
    image: "/projects/project-6.jpg",
    imageFull: "/projects/project-6-full.jpg",
  },
];
