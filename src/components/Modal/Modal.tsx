import React from "react";
import { useModal } from "@/stores/useModal";

interface ModalProps {
  title: string;
  onSave: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onSave, children }) => {
  const { isOpen, close } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            취소
          </button>
          <button
            onClick={() => {
              onSave();
              close();
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
