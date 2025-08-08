export const labelThemes = {
  gray: "bg-gray-200 text-gray-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
} as const;

export type LabelTheme = keyof typeof labelThemes;
