// src/data/roster.ts

export type Player = {
  id: number;
  jerseyNumber: number;
  name?: string;     // optional, for later
  position?: string; // optional, for later
};

export const ROSTER: Player[] = [
  { id: 1, jerseyNumber: 37 },
  { id: 2, jerseyNumber: 3 },
  { id: 3, jerseyNumber: 23 },
  { id: 4, jerseyNumber: 12 },
  { id: 5, jerseyNumber: 26 },
  { id: 6, jerseyNumber: 10 },
  { id: 7, jerseyNumber: 39 },
  { id: 8, jerseyNumber: 67 }, // updated from 63
  { id: 9, jerseyNumber: 84 },
  { id: 10, jerseyNumber: 48 },
  { id: 11, jerseyNumber: 71 },
  { id: 12, jerseyNumber: 19 },
  { id: 13, jerseyNumber: 7 },
  { id: 14, jerseyNumber: 57 },
  { id: 15, jerseyNumber: 92 },
  { id: 16, jerseyNumber: 21 },
];
