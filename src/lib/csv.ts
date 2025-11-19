import type { ShotRow } from "./types";

export function parseCSV(text: string): ShotRow[] {
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const cols = header.split(",");

  return rows.filter(Boolean).map(line => {
    const vals = line.split(",");
    const obj: any = {};

    cols.forEach((c, i) => {
      obj[c] = vals[i] ?? "";
    });

    // numeric casts
    obj.period = Number(obj.period);
    obj.x = Number(obj.x);
    obj.y = Number(obj.y);

    // NEW → convert jersey number if present
    if (obj.playerNumber !== undefined && obj.playerNumber !== "") {
      obj.playerNumber = Number(obj.playerNumber);
    } else {
      obj.playerNumber = null;
    }

    // xG optional
    if (obj.xg !== undefined && obj.xg !== "") {
      obj.xg = Number(obj.xg);
    }

    return obj as ShotRow;
  });
}



