export interface Ability {
  name: string;
  pct: number;
  gradient: string;
}

export const abilities: Ability[] = [
  {
    name: "UI/UX Design",
    pct: 95,
    gradient: "linear-gradient(90deg, #e8ff47, #c6e840)",
  },
  {
    name: "Brand Identity",
    pct: 92,
    gradient: "linear-gradient(90deg, #ff6b4a, #ff966b)",
  },
  {
    name: "Typography",
    pct: 88,
    gradient: "linear-gradient(90deg, #b48aff, #d3b3ff)",
  },
  {
    name: "Motion Design",
    pct: 78,
    gradient: "linear-gradient(90deg, #47f0ff, #80f5ff)",
  },
  {
    name: "Illustration",
    pct: 82,
    gradient: "linear-gradient(90deg, #ffb347, #ffd280)",
  },
  {
    name: "Art Direction",
    pct: 90,
    gradient: "linear-gradient(90deg, #ff7eb3, #ffb3d1)",
  },
];

export const radarLabels = [
  "UI/UX",
  "Branding",
  "Typography",
  "Motion",
  "Illustration",
  "Art Direction",
];

export const radarVals = [0.95, 0.92, 0.88, 0.78, 0.82, 0.9];

export const radarColors = [
  "#e8ff47", // UI/UX — accent
  "#ff6b4a", // Branding — coral
  "#b48aff", // Typography — violet
  "#47f0ff", // Motion — cyan
  "#ffb347", // Illustration — amber
  "#ff7eb3", // Art Direction — pink
];
