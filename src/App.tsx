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
  const [tapResult, setTapResult] = useState<"Shot" | "Goal">("Shot");


  // Local shots added by tapping the rink
  const [localShots, setLocalShots] = useState<ShotRow[]>([]);

  // -------------------------------------------------
  // LOAD CSV + AUTO-MATCH PLAYERS
  // -------------------------------------------------
  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    const url = base + "shots_sample.csv";

    fetch(url)
      .then((r) => r.text())
      .then((t) => {
        const rows = parseCSV(t);

        const rowsWithPlayers = rows.map((row) => {
          const matched = row.playerNumber
            ? ROSTER.find((p) => p.jerseyNumber === Number(row.playerNumber))
            : undefined;

          return {
            ...row,
            playerId: matched ? matched.id : null,
            playerNumber: matched ? matched.jerseyNumber : null,
            _playerObj: matched || null,
          };
        });

        setRaw(rowsWithPlayers);
      });
  }, []);

  // -------------------------------------------------
  // FILTERING + MERGED SHOT DATA
  // -------------------------------------------------
  const teams = useMemo(
    () => Array.from(new Set(raw.map((r) => r.team))),
    [raw]
  );

  const shots = useMemo(() => {
    const csvShots = raw.filter(
      (s) =>
        (period === "All" || s.period === Number(period)) &&
        (team === "All" || s.team === team) &&
        (result === "All" || s.result === result) &&
        (selectedPlayer === null ||
          s.playerNumber === selectedPlayer.jerseyNumber)
    );

    const liveShots = localShots.filter(
      (s) =>
        (period === "All" || s.period === Number(period)) &&
        (result === "All" || s.result === result) &&
        (selectedPlayer === null ||
          s.playerNumber === selectedPlayer.jerseyNumber)
    );

    return [...csvShots, ...liveShots];
  }, [raw, localShots, period, team, result, selectedPlayer]);

  const goals = shots.filter((s) => s.result === "Goal").length;
  const sog = shots.filter((s) => s.result === "Shot" || s.result === "Goal").length;

// -------------------------------------------------
// REAL TAP HANDLER
// -------------------------------------------------
const handleRinkTap = (svgX: number, svgY: number) => {
  if (!selectedPlayer) {
    alert("Select a player before adding shots.");
    return;
  }

  const newShot: ShotRow = {
    game_id: "LIVE",
    period: period === "All" ? 1 : Number(period),
    time: "LIVE",
    team: team === "All" ? "CHI" : team,
    player: selectedPlayer.name ?? "",
    playerNumber: selectedPlayer.jerseyNumber,
    handed: "L",
    shot_type: "Tap",
    result: tapResult,   // <-- NOW WORKS
    x: svgX,
    y: svgY,
    xg: 0.05,
  };

  setLocalShots((prev) => [...prev, newShot]);
};


  // -------------------------------------------------
  // UI
  // -------------------------------------------------
  return (
    <div
      className={[
        "min-h-screen p-6",
        dark ? "bg-[#002654] text-white" : "bg-neutral-100 text-neutral-900",
      ].join(" ")}
    >
      {/* HEADER */}
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-slate-900/80 flex items-center justify-center shadow-lg">
            <img src={sabresLogo} alt="Sabres logo" className="h-11 w-11 object-contain" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-amber-300 drop-shadow-sm">
              ShotMat — Sabres Shot Map
            </h1>

            {selectedPlayer && (
              <p className={"mt-0.5 text-xs " + (dark ? "text-amber-100/90" : "text-slate-600")}>
                Tracking shots for{" "}
                <span className="font-semibold">#{selectedPlayer.jerseyNumber}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          className="text-xs border border-slate-500/70 rounded px-3 py-1.5 bg-slate-900/60 text-slate-100 shadow-sm hover:border-amber-300 hover:text-amber-200 transition"
        >
          {dark ? "Ice Mode" : "Sabres Mode"}
        </button>
      </header>

      {/* MAIN */}
      <main className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:gap-12">
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-72 space-y-4">
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
            {/* Tap Shot Type Selector */}
<div className="mt-3 border-t border-slate-700/50 pt-3">
  <label className="block text-xs font-semibold text-amber-300 mb-1">
    Tap Result
  </label>
  <div className="flex gap-2">
    <button
      onClick={() => setTapResult("Shot")}
      className={
        "flex-1 px-2 py-1 rounded text-xs " +
        (tapResult === "Shot"
          ? "bg-amber-400/20 border border-amber-300 text-amber-200"
          : "bg-slate-800/60 border border-slate-600 text-slate-300")
      }
    >
      Shot
    </button>

    <button
      onClick={() => setTapResult("Goal")}
      className={
        "flex-1 px-2 py-1 rounded text-xs " +
        (tapResult === "Goal"
          ? "bg-amber-400/20 border border-amber-300 text-amber-200"
          : "bg-slate-800/60 border border-slate-600 text-slate-300")
      }
    >
      Goal
    </button>
  </div>
</div>

          </div>
        </div>

        {/* RINK */}
        <div className="flex-1 flex flex-col items-center">
<Rink onTap={handleRinkTap}>
  <ShotPlot shots={shots} />
</Rink>


          <div
            className={
              "mt-4 text-center text-sm " +
              (dark ? "text-slate-100/90" : "text-slate-700")
            }
          >
            Shots: {shots.length} • SOG: {sog} • Goals: {goals}
          </div>
        </div>
      </main>
    </div>
  );
}
