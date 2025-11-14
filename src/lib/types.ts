export type ShotRow = {
  game_id: string;
  period: number;
  time: string;
  team: string;
  player: string;
  handed?: 'L' | 'R';
  shot_type?: string;
  result: 'Shot' | 'Miss' | 'Goal' | 'Blocked';
    // NEW – optional, so existing CSV still works
  playerId?: number | null;
  playerNumber?: number | null;
  x: number; // feet from center toward attacking goal
  y: number; // feet from centerline (we’ll invert for screen coords)
  xg?: number;
};
