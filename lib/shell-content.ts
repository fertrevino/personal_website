export const about = {
  tagline: "building AI systems for industry",
  heading:
    "Data platforms, autonomous programs, and infrastructure at scale.",
  body: "I work at the intersection of cloud architecture, ML infrastructure, and platform engineering. I write about what I build.",
};

export const now = {
  role: "Lead Architect at Siemens",
  description:
    "Designing AWS cloud foundations and an AI-first application platform. Also building next-generation infrastructure management using AI privately.",
  tags: ["cloud architecture", "ai-first platform"],
};

export const contact = {
  heading: "Let's work together",
  body: "Open to interesting problems in AI, data engineering, and cloud infrastructure.",
  email: "fernando.yanez.trevino@gmail.com",
};

export type SideProject = {
  name: string;
  status: "active" | "shipped";
  desc: string;
  url?: string;
};

export const sideProjects: SideProject[] = [
  {
    name: "Infrastructure AI",
    status: "active",
    desc: "Next-generation infrastructure management using AI agents.",
  },
  {
    name: "Menuop.com",
    status: "shipped",
    desc: "Digital menu service for restaurants.",
    url: "https://menuop.com",
  },
  {
    name: "Northbots.com",
    status: "active",
    desc: "AI copilots platform for automating business workflows.",
    url: "https://northbots.com",
  },
];
