import { PropsWithChildren } from "react";

export default function Card({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded-xl border p-4 shadow bg-white">
      <div className="mb-2 text-xl font-bold">{title}</div>
      <div>{children}</div>
    </div>
  );
}
