"use client";

import { useModal } from "@/stores/useModal";
import Modal from "@/components/Modal/Modal";
import OrderBuyModal from "@/templates/Coin/Order/Modal/OrderBuyModal";

export default function Home() {
  const { open } = useModal();

  const handleSave = (name: string, count: string, side: string) => {
    console.log(name, count, side);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={open}
        className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
      >
        팝업 열기
      </button>

      <OrderBuyModal name={"1234"} count={"100"} onSave={handleSave} />
    </div>
  );
}
