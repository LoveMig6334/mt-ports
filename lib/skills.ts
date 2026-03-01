export interface Ability {
  name: string;
  pct: number;
  gradient: string;
}

export const abilities: Ability[] = [
  {
    name: "ภาษาไทย",
    pct: 89,
    gradient: "linear-gradient(90deg, #e8ff47, #c6e840)",
  },
  {
    name: "ภาษาอังกฤษ",
    pct: 81,
    gradient: "linear-gradient(90deg, #ff6b4a, #ff966b)",
  },
  {
    name: "คณิตศาสตร์",
    pct: 86,
    gradient: "linear-gradient(90deg, #b48aff, #d3b3ff)",
  },
  {
    name: "ฟิสิกส์",
    pct: 96,
    gradient: "linear-gradient(90deg, #47f0ff, #80f5ff)",
  },
  {
    name: "เคมี",
    pct: 85,
    gradient: "linear-gradient(90deg, #ffb347, #ffd280)",
  },
  {
    name: "ชีววิทยา",
    pct: 74,
    gradient: "linear-gradient(90deg, #ff7eb3, #ffb3d1)",
  },
  {
    name: "คอมพิวเตอร์",
    pct: 99,
    gradient: "linear-gradient(90deg, #e8ff47, #47f0ff)",
  },
];

export const radarLabels = [
  "การสื่อสาร",
  "การวิเคราะห์แก้ปัญหา",
  "การหาข้อมูล",
  "การทำงานจริง",
  "การบริหารเวลา",
  "การนำเสนองาน",
];

export const radarVals = [0.89, 0.91, 0.84, 0.95, 0.8, 0.85];

export const radarColors = [
  "#e8ff47", // การสื่อสาร — accent
  "#ff6b4a", // การวิเคราะห์แก้ปัญหา — coral
  "#b48aff", // การหาข้อมูล — violet
  "#47f0ff", // การทำงานจริง — cyan
  "#ffb347", // การบริหารเวลา — amber
  "#ff7eb3", // การนำเสนองาน — pink
];
