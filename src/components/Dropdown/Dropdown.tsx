"use client";
import { useState } from "react";

type DropdownProps = {
  options: { key: string; value: string }[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(
    selectedValue ?? null,
  );

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex w-48 justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selected ?? "옵션 선택"}
        <svg
          className="h-5 w-5 text-gray-500 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.key}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
