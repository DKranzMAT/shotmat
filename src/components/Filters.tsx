import React from "react";

type Props = {
  period: number | "All"; setPeriod: (v: any) => void;
  team: string | "All";  setTeam: (v: any) => void;
  result: string | "All"; setResult: (v: any) => void;
  teams: string[];
};

export function Filters({ period, setPeriod, team, setTeam, result, setResult, teams }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 items-start justify-center my-4 w-full max-w-xl mx-auto">

      {/* Period */}
      <div className="flex flex-col text-xs font-semibold text-gray-200 items-center">
        <label className="mb-1">Period</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
          className="sabres-select border px-3 py-1 rounded w-full text-center"
        >
          {["All", 1, 2, 3].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Team */}
      <div className="flex flex-col text-xs font-semibold text-gray-200 items-center">
        <label className="mb-1">Team</label>
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="sabres-select border px-3 py-1 rounded w-full text-center"
        >
          <option value="All">All</option>
          {teams.length >= 1 && <option value={teams[0]}>Home</option>}
          {teams.length >= 2 && <option value={teams[1]}>Away</option>}
        </select>
      </div>

      {/* Type */}
      <div className="flex flex-col text-xs font-semibold text-gray-200 items-center">
        <label className="mb-1">Type</label>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value as any)}
          className="sabres-select border px-3 py-1 rounded w-full text-center"
        >
          {["All", "Shot", "Miss", "Goal", "Blocked"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

