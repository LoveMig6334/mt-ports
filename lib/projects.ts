export interface Project {
  id: string;
  title: string;
  category: string;
  description?: string;
  thumbnail: string;
  images: string[];
  aspectRatio?: string;
}

export const projects: Project[] = [
  {
    id: "neon-flux",
    title: "Neon Flux",
    category: "Branding / Visual Identity",
    thumbnail: "/projects/neon-flux/thumbnail.jpg",
    images: ["/projects/neon-flux/1.jpg"],
    aspectRatio: "16/10",
  },
  {
    id: "prism-ui-kit",
    title: "Prism UI Kit",
    category: "UI / UX Design",
    thumbnail: "/projects/prism-ui-kit/thumbnail.jpg",
    images: ["/projects/prism-ui-kit/1.jpg"],
  },
  {
    id: "solstice-mag",
    title: "Solstice Mag",
    category: "Art Direction",
    thumbnail: "/projects/solstice-mag/thumbnail.jpg",
    images: ["/projects/solstice-mag/1.jpg"],
  },
  {
    id: "vortex-series",
    title: "Vortex Series",
    category: "Typography / Poster",
    thumbnail: "/projects/vortex-series/thumbnail.jpg",
    images: ["/projects/vortex-series/1.jpg"],
    aspectRatio: "16/10",
  },
  {
    id: "retrowave-co",
    title: "RetroWave Co.",
    category: "Branding / Packaging",
    thumbnail: "/projects/retrowave-co/thumbnail.jpg",
    images: ["/projects/retrowave-co/1.jpg"],
  },
  {
    id: "chromatic-labs",
    title: "Chromatic Labs",
    category: "Motion / Identity",
    thumbnail: "/projects/chromatic-labs/thumbnail.jpg",
    images: ["/projects/chromatic-labs/1.jpg"],
  },
];
