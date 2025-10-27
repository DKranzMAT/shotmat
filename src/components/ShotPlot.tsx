import React from "react";
import type { ShotRow } from "../lib/types";

const colorByResult: Record<ShotRow["result"], string> = {
  Goal: "#16a34a",
  Shot: "#2563eb",
  Miss: "#f59e0b",
  Blocked: "#6b7280",
};

export function ShotPlot({ shots }: { shots: ShotRow[] }) {
  return (
    <>
      {shots.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={-s.y}            // invert y so positive is up
          r={s.result === "Goal" ? 2.8 : 2}
          fill={colorByResult[s.result] || "#2563eb"}
          opacity="0.9"
        >
          <title>{`${s.team} • ${s.player} • ${s.result} (${s.time})`}</title>
        </circle>
      ))}
    </>
  );
}
