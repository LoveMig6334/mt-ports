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
    id: "ayc",
    title: "ASEAN Youth Camp",
    category: "Exchange Program / Leadership",
    description:
      "An ASEAN-wide camp bringing together secondary students from across Southeast Asia to collaborate, share cultures, and engage in educational activities that foster regional friendship and leadership.",
    thumbnail: "/projects/ayc/1.png",
    images: [
      "/projects/ayc/1.png",
      "/projects/ayc/2.png",
      "/projects/ayc/3.png",
    ],
    aspectRatio: "16/9",
  },
  {
    id: "cd-voting",
    title: "CD Voting",
    category: "Innovation / Design",
    description:
      "A participatory design project exploring digital voting interfaces and community-driven decision-making, combining user research with creative problem-solving to shape accessible civic tools.",
    thumbnail: "/projects/cd-voting/1.png",
    images: [
      "/projects/cd-voting/1.png",
      "/projects/cd-voting/2.png",
      "/projects/cd-voting/3.png",
      "/projects/cd-voting/4.png",
      "/projects/cd-voting/5.png",
      "/projects/cd-voting/6.png",
      "/projects/cd-voting/7.png",
      "/projects/cd-voting/8.png",
      "/projects/cd-voting/9.png",
    ],
    aspectRatio: "16/10",
  },
  {
    id: "cedt-camp",
    title: "CEDT Camp",
    category: "Camp / Engineering",
    description:
      "An intensive camp by Chulalongkorn University's Computer Engineering and Digital Technology program, introducing high school students to the intersection of engineering and digital innovation through hands-on workshops and real-world challenges.",
    thumbnail: "/projects/cedt-camp/1.jpg",
    images: [
      "/projects/cedt-camp/1.jpg",
      "/projects/cedt-camp/2.jpg",
      "/projects/cedt-camp/3.jpg",
      "/projects/cedt-camp/4.jpg",
    ],
    aspectRatio: "16/10",
  },
  {
    id: "comcamp",
    title: "ComCamp",
    category: "Camp / Computer Science",
    description:
      "A hands-on computer engineering camp organized by senior CPE students at KMUTT, where high school participants learn C programming, logic building, and create their first terminal game — all while getting a taste of university life.",
    thumbnail: "/projects/comcamp/1.jpg",
    images: [
      "/projects/comcamp/1.jpg",
      "/projects/comcamp/2.jpg",
      "/projects/comcamp/3.jpg",
      "/projects/comcamp/4.jpg",
      "/projects/comcamp/5.jpg",
      "/projects/comcamp/6.jpg",
      "/projects/comcamp/7.jpg",
      "/projects/comcamp/8.jpg",
      "/projects/comcamp/9.jpg",
    ],
    aspectRatio: "16/9",
  },
  {
    id: "comcamp-2",
    title: "ComCamp 2",
    category: "Camp / Computer Science",
    description:
      "A second immersion into ComCamp's collaborative environment, diving deeper into computer engineering fundamentals through programming challenges, team projects, and peer mentorship with students from across Thailand.",
    thumbnail: "/projects/comcamp-2/1.jpg",
    images: [
      "/projects/comcamp-2/1.jpg",
      "/projects/comcamp-2/2.jpg",
      "/projects/comcamp-2/3.jpg",
      "/projects/comcamp-2/4.jpg",
      "/projects/comcamp-2/5.jpg",
      "/projects/comcamp-2/6.jpg",
      "/projects/comcamp-2/7.jpg",
    ],
    aspectRatio: "16/9",
  },
  {
    id: "jssf",
    title: "Japan Super Science Fair",
    category: "Science Fair / Exchange",
    description:
      "A prestigious international science fair enabling students to present research and exchange knowledge with peers from Super Science High Schools across Japan and Asia, fostering global scientific collaboration and cross-cultural understanding.",
    thumbnail: "/projects/jssf/1.jpg",
    images: [
      "/projects/jssf/1.jpg",
      "/projects/jssf/2.jpg",
      "/projects/jssf/3.jpg",
      "/projects/jssf/4.jpg",
      "/projects/jssf/5.jpg",
      "/projects/jssf/6.jpg",
      "/projects/jssf/7.jpg",
      "/projects/jssf/8.jpg",
    ],
    aspectRatio: "16/10",
  },
  {
    id: "sic",
    title: "Student Innovation Challenge",
    category: "Innovation / Competition",
    description:
      "A competitive innovation challenge where student teams identify real-world problems and develop creative, technology-driven solutions — pushing the boundaries of design thinking and collaborative engineering.",
    thumbnail: "/projects/sic/1.jpg",
    images: [
      "/projects/sic/1.jpg",
      "/projects/sic/2.jpg",
      "/projects/sic/3.jpg",
      "/projects/sic/4.jpg",
      "/projects/sic/5.jpg",
      "/projects/sic/6.jpg",
    ],
    aspectRatio: "16/10",
  },
  {
    id: "trash-to-coin",
    title: "Trash to Coin",
    category: "Innovation / Sustainability",
    description:
      "A student-led innovation project that transforms waste into value — exploring circular economy principles, upcycling design, and community-driven sustainability to tackle environmental challenges through creative problem-solving.",
    thumbnail: "/projects/trash-to-coin/1.jpg",
    images: [
      "/projects/trash-to-coin/1.jpg",
      "/projects/trash-to-coin/2.jpg",
      "/projects/trash-to-coin/3.jpg",
      "/projects/trash-to-coin/4.jpg",
      "/projects/trash-to-coin/5.jpg",
      "/projects/trash-to-coin/6.jpg",
      "/projects/trash-to-coin/7.jpg",
      "/projects/trash-to-coin/8.jpg",
      "/projects/trash-to-coin/9.jpg",
    ],
    aspectRatio: "16/10",
  },
];
