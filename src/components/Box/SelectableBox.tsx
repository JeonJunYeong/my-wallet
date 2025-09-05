import { Box } from "@/components/Box/Box";

interface SelectableBoxProps {
  title?: string;
  children: React.ReactNode;
  rounded?: string;
  selected?: boolean;
  onSelect?: () => void;
}

export const SelectableBox = ({
  title,
  children,
  rounded,
  selected = false,
  onSelect,
}: SelectableBoxProps) => {
  return (
    <Box title={title} rounded={rounded}>
      <div
        className={`transition-colors rounded p-2 cursor-pointer
          ${selected ? "bg-blue-50" : "bg-white hover:bg-blue-50"}`}
        onClick={onSelect}
      >
        {children}
      </div>
    </Box>
  );
};
