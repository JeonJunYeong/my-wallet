"use client";

import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useEffect, useState } from "react";

interface OrderBuyModalProps {
  name: string;
  count: string;
  onSave: (
    orderType: "open" | "close",
    name: string,
    count: string,
    side: string,
  ) => void;
  side: string;
  id?: string;
  orderTYpe: "open" | "close";
}

export default function OrderBuyModal(props: OrderBuyModalProps) {
  const { name, onSave, count, side, id, orderTYpe } = props;
  const [countValue, setCountValue] = useState(count);
  const [selectSide, setSelectSide] = useState(side);

  useEffect(() => {
    setCountValue(count);
  }, [count]);

  useEffect(() => {
    setSelectSide(side);
  }, [side]);

  return (
    <Modal
      title="정보 입력"
      onSave={() => onSave(orderTYpe, name, countValue, selectSide)}
    >
      <p className="text-gray-700">{name}</p>
      <input
        type="text"
        placeholder="예: 이름 입력"
        className="mt-3 w-full border rounded-lg px-3 py-2"
        value={countValue}
        onChange={(event) => {
          setCountValue(event.target.value);
        }}
      />
      <div className={"m-4"} />
      <Dropdown
        options={[
          { key: "buy", value: "buy" },
          { key: "sell", value: "sell" },
        ]}
        onSelect={(value) => {
          setSelectSide(value);
        }}
        selectedValue={side || ""}
      />
    </Modal>
  );
}
