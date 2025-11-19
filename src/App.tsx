import React, { useEffect, useMemo, useState } from "react";
import { ROSTER, type Player } from "./data/roster";
import { PlayerPicker } from "./components/PlayerPicker";
import { Rink } from "./components/Rink";
import { ShotPlot } from "./components/ShotPlot";
import { Filters } from "./components/Filters";
import type { ShotRow } from "./lib/types";
import { parseCSV } from "./lib/csv";
import { Legend } from "./components/Legend";
import sabresLogo from "./assets/sabres-logo.png";

export default function App() {
  const [raw, setRaw] = useState<ShotRow[]>([]);
  const [period, setPeriod] = useState<number | "All">("All");
  const [team, setTeam] = useState<string | "All">("All");
  const [result, setResult] = useState<string | "All">("All");
  const [dark, setDark] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

useEffect(() => {
  const base = import.meta.env.BASE_URL || "/";
  const url = base + "shots_sample.csv";

  fetch(url)
    .then((r) => r.text())
    .then((t) => {
      const rows = parseCSV(t);

      const rowsWithPlayers = rows.map((row) => {
        let matched: Player | undefined;

        // Match by jersey number
        if (row.playerNumber) {
          matched = ROSTER.find(
            (p) => Number(p.jerseyNumber) === Number(row.playerNumber)
          );
        }

        return {
          ...row,
          playerId: matched ? matched.id : null,
          playerNumber: matched ? matched.jerseyNumber : null,
          _playerObj: matched || null
        };
      });

      setRaw(rowsWithPlayers);
    });
}, []); // <-- CLOSE THE EFFECT PROPERLY


  const teams = useMemo(
    () => Array.from(new Set(raw.map((r) => r.team))),
    [raw]
  );

const shots = useMemo(
  () =>
    raw.filter((s) =>
      (period === "All" || s.period === Number(period)) &&
      (team === "All" || s.team === team) &&
      (result === "All" || s.result === result) &&
      (selectedPlayer === null ||
        s.playerNumber === selectedPlayer.jerseyNumber)
    ),
  [raw, period, team, result, selectedPlayer]
);

  const goals = shots.filter((s) => s.result === "Goal").length;
  const sog = shots.filter(
    (s) => s.result === "Shot" || s.result === "Goal"
  ).length;

  return (
    <div
      className={[
        "min-h-screen p-6",
        dark
            ? "bg-[#002654] text-white"
            : "bg-neutral-100 text-neutral-900"
      ].join(" ")}
    >
      {/* Header with logo and title */}
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-slate-900/80 flex items-center justify-center shadow-lg">
            <img
              src={sabresLogo}
              alt="Sabres logo"
              className="h-11 w-11 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-amber-300 drop-shadow-sm">
              ShotMat — Sabres Shot Map
            </h1>
            {selectedPlayer && (
              <p
                className={
                  "mt-0.5 text-xs " +
                  (dark
                    ? "text-amber-100/90"     // Sabres mode: bright, gold-ish
                    : "text-slate-600")       // Ice mode: darker gray on light bg
                }
              >
                Tracking shots for{" "}
                <span className="font-semibold">
                  #{selectedPlayer.jerseyNumber}
                </span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          className="text-xs border border-slate-500/70 rounded px-3 py-1.5 bg-slate-900/60 text-slate-100 shadow-sm hover:border-amber-300 hover:text-amber-200 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? "Ice Mode" : "Sabres Mode"}
        </button>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:gap-12">
        {/* Left column: player picker + filters */}
        <div className="w-full md:w-72 md:flex-shrink-0 space-y-4">
          <PlayerPicker
            roster={ROSTER}
            selectedPlayer={selectedPlayer}
            onSelect={setSelectedPlayer}
          />

          <div className="rounded-xl bg-slate-900/50 border border-slate-700/70 p-3 shadow-md">
            <Filters
              period={period}
              setPeriod={setPeriod}
              team={team}
              setTeam={setTeam}
              result={result}
              setResult={setResult}
              teams={teams}
            />
            <Legend />
          </div>
        </div>

        {/* Right column: rink + stats */}
        <div className="flex-1 flex flex-col items-center">
          <Rink>
            <ShotPlot shots={shots} />
          </Rink>
          <div
            className={
              "mt-4 text-center text-sm " +
              (dark ? "text-slate-100/90" : "text-slate-700")
            }>
            Shots: {shots.length} • SOG: {sog} • Goals: {goals}
          </div>
        </div>
      </main>
    </div>
  );
}
