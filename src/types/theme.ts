export const themes = {
  light: "bg-white text-gray-800",
  dark: "bg-gray-800 text-white",
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-200 text-gray-900",
} as const;

export type Theme = keyof typeof themes;
