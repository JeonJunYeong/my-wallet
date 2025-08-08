import { LabelTheme, labelThemes } from "@/components/Label/Label.type";

interface LabelProps {
  text: string;
  theme?: LabelTheme;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  theme = "gray",
  className = "",
}) => {
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium rounded-full";
  const themeClasses = labelThemes[theme];

  return (
    <span className={`${baseClasses} ${themeClasses} ${className}`}>
      {text}
    </span>
  );
};
