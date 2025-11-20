import { useMemo, useState } from "react";
import MiniSearch from "minisearch";
import type { Player } from "../data/roster";

type PlayerPickerProps = {
  roster: Player[];
  selectedPlayer: Player | null;
  onSelect: (player: Player | null) => void;
};

type PlayerDoc = {
  id: number;
  jerseyNumber: number;
  name?: string;
  text: string;
};

export function PlayerPicker({
  roster,
  selectedPlayer,
  onSelect,
}: PlayerPickerProps) {
  const [query, setQuery] = useState("");

const { miniSearch, docs } = useMemo(() => {
  const docs: PlayerDoc[] = roster.map((p) => ({
    id: p.id,
    jerseyNumber: p.jerseyNumber,
    name: p.name,
    text: `${p.jerseyNumber} ${p.name ?? ""}`.trim(),
  }));

  const miniSearch = new MiniSearch({
    fields: ["text", "name"],       // <— THIS IS THE MAGIC LINE
    storeFields: ["id", "jerseyNumber", "name"],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  });

  miniSearch.addAll(docs);
  return { miniSearch, docs };
}, [roster]);


  const trimmedQuery = query.trim();

  let results: PlayerDoc[] =
    trimmedQuery === ""
      ? [...docs].sort((a, b) => a.jerseyNumber - b.jerseyNumber)
      : (miniSearch.search(trimmedQuery, {
          prefix: true,
          fuzzy: 0.2,
        }) as any[]).map((r) => ({
          id: r.id,
          jerseyNumber: r.jerseyNumber,
          name: r.name,
          text: r.text,
        }));

  const handleSelect = (doc: PlayerDoc) => {
    const player = roster.find((p) => p.id === doc.id) ?? null;
    onSelect(player);
  };

  const handleClear = () => {
    setQuery("");
    onSelect(null);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-amber-300/80 bg-[#0b1733]/95 text-white p-4 shadow-lg">
      {/* Search Box Label + Field */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex-1">
          <label
            htmlFor="player-search"
            className="block text-xs font-semibold uppercase tracking-wide text-amber-300"
          >
            Player Search
          </label>
          <input
            id="player-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type number or name..."
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
          />
        </div>

        {/* Clear Button */}
        {selectedPlayer && (
          <button
            type="button"
            onClick={handleClear}
            className="mt-5 rounded-lg border border-slate-500 px-3 py-1 text-xs font-medium text-white hover:border-amber-300 hover:text-amber-200 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Selected Player Display */}
      {selectedPlayer ? (
        <div className="mb-3 rounded-lg bg-amber-400/10 px-3 py-2 text-xs text-amber-100 border border-amber-300/60">
          <span className="font-semibold">
            Selected: #{selectedPlayer.jerseyNumber}
          </span>
          {selectedPlayer.name && (
            <span className="ml-1"> – {selectedPlayer.name}</span>
          )}
        </div>
      ) : (
        <div className="mb-3 text-xs text-slate-300">
          No player selected. Shots will be unassigned until you pick one.
        </div>
      )}

      {/* Player List */}
      <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
        {results.map((doc) => {
          const isSelected =
            selectedPlayer &&
            selectedPlayer.jerseyNumber === doc.jerseyNumber;

          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => handleSelect(doc)}
              className={
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition " +
                (isSelected
                  ? "border border-amber-300 bg-amber-400/15 text-amber-100"
                  : "border border-transparent bg-slate-800/70 text-white hover:border-slate-500 hover:bg-slate-800")
              }
            >
              <span className="font-semibold">#{doc.jerseyNumber}</span>
              {doc.name && (
                <span className="ml-2 truncate text-xs text-slate-200">
                  {doc.name}
                </span>
              )}
            </button>
          );
        })}

        {results.length === 0 && (
          <div className="rounded-lg bg-slate-800/70 px-3 py-2 text-xs text-slate-300">
            No players match “{query}”.
          </div>
        )}
      </div>
    </div>
  );
}
