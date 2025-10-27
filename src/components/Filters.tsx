import React from "react";

type Props = {
  period: number | "All"; setPeriod: (v: any) => void;
  team: string | "All";  setTeam: (v: any) => void;
  result: string | "All"; setResult: (v: any) => void;
  teams: string[];
};

export function Filters({ period, setPeriod, team, setTeam, result, setResult, teams }: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center my-4">
      <select value={period} onChange={e=>setPeriod(e.target.value as any)} className="border px-2 py-1 rounded">
        {["All", 1, 2, 3].map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select value={team} onChange={e=>setTeam(e.target.value as any)} className="border px-2 py-1 rounded">
        {["All", ...teams].map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <select value={result} onChange={e=>setResult(e.target.value as any)} className="border px-2 py-1 rounded">
        {["All","Shot","Miss","Goal","Blocked"].map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}
