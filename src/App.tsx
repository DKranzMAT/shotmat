import React, { useEffect, useMemo, useState } from "react";
import { Rink } from "./components/Rink";
import { ShotPlot } from "./components/ShotPlot";
import { Filters } from "./components/Filters";
import type { ShotRow } from "./lib/types";
import { parseCSV } from "./lib/csv";
import { Legend } from "./components/Legend";

export default function App() {
  const [raw, setRaw] = useState<ShotRow[]>([]);
  const [period, setPeriod] = useState<number | "All">("All");
  const [team, setTeam] = useState<string | "All">("All");
  const [result, setResult] = useState<string | "All">("All");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // dev server can fetch directly from /src
    fetch("shots_sample.csv")
      .then(r => r.text())
      .then(t => setRaw(parseCSV(t)));
  }, []);

  const teams = useMemo(() => Array.from(new Set(raw.map(r => r.team))), [raw]);

  const shots = useMemo(() => raw.filter(s =>
    (period === "All" || s.period === Number(period)) &&
    (team   === "All" || s.team   === team) &&
    (result === "All" || s.result === result)
  ), [raw, period, team, result]);

  const goals = shots.filter(s => s.result === "Goal").length;
  const sog   = shots.filter(s => s.result === "Shot" || s.result === "Goal").length;

return (
  <div
  className={[
    "min-h-screen p-6",
    dark ? "bg-neutral-900 text-neutral-100" : "bg-neutral-100 text-neutral-900",
  ].join(" ")}
>
    <h1 className="text-2xl font-semibold text-center text-blue-600">ShotMat — NHL Shot Map</h1>
    <div className="flex items-center justify-center mt-2 mb-3">
  <button
    onClick={() => setDark((d) => !d)}
    className="text-xs border rounded px-2 py-1"
    aria-label="Toggle dark mode"
  >
    {dark ? "Light" : "Dark"}
  </button>
</div>

    <Filters
      period={period} setPeriod={setPeriod}
      team={team} setTeam={setTeam}
      result={result} setResult={setResult}
      teams={teams}
    />
    <Legend />
    <Rink>
      <ShotPlot shots={shots} />
    </Rink>
    <div className="mt-4 text-center text-sm opacity-80">
      Shots: {shots.length} • SOG: {sog} • Goals: {goals}
    </div>
  </div>
);
}
