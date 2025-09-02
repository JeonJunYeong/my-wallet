import React from "react";

export interface Segment {
  color: string;
  value: number;
  label?: string;
}

interface SequentialProgressBarProps {
  segments?: Segment[];
  total?: number;
  height?: string;
  showLabels?: boolean;
}

export default function SequentialProgressBar({
  segments = [],
  total = 100,
  height = "1.25rem",
  showLabels = false,
}: SequentialProgressBarProps) {
  let acc = 0;

  const segmentsWithPercent = segments.map((s) => {
    const remaining = Math.max(total - acc, 0);
    const take = Math.min(s.value, remaining);
    const leftPercent = (acc / total) * 100;
    const widthPercent = (take / total) * 100;
    acc += take;
    return {
      color: s.color,
      value: s.value,
      taken: take,
      leftPercent,
      widthPercent,
      label: s.label,
    };
  });

  const filledPercent =
    (segmentsWithPercent.reduce((a, b) => a + b.taken, 0) / total) * 100;

  return (
    <div>
      <div
        className="w-full rounded overflow-hidden relative"
        style={{ background: "#e5e7eb", height }}
        aria-hidden
      >
        {segmentsWithPercent.map((seg, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${seg.leftPercent}%`,
              width: `${seg.widthPercent}%`,
              height: "100%",
              background: seg.color,
              transition:
                "width 600ms ease, left 600ms ease, background-color 600ms ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                shadeColor(seg.color, -20);
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                seg.color;
            }}
          >
            {showLabels && seg.taken > 5 ? `${seg.taken}` : null}
          </div>
        ))}
      </div>

      {segments.length > 0 && (
        <div className="mt-2 flex gap-3 flex-wrap">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span
                style={{
                  width: 14,
                  height: 14,
                  background: s.color,
                  display: "inline-block",
                  borderRadius: 3,
                  transition: "background-color 300ms ease",
                }}
              />
              <span>{s.label ?? `${s.value}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function shadeColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
