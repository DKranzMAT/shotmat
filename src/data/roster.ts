// src/data/roster.ts

export type Player = {
  id: number;
  jerseyNumber: number;
  name?: string;     // optional, for later
  position?: string; // optional, for later
};

export const ROSTER: Player[] = [
  { id: 1, jerseyNumber: 37, name: "Nick Bertuca" },
  { id: 2, jerseyNumber: 3, name: "Cam Clarke" },
  { id: 3, jerseyNumber: 23, name: "Connor Crowe" },
  { id: 4, jerseyNumber: 12, name: "Max Culen" },
  { id: 5, jerseyNumber: 26, name: "Abel Custer" },
  { id: 6, jerseyNumber: 10, name: "Beckett Fox" },
  { id: 7, jerseyNumber: 39, name: "Ben Graveline" },
  { id: 8, jerseyNumber: 67, name: "Dylan Kranz" },
  { id: 9, jerseyNumber: 84, name: "Logan Larken" },
  { id: 10, jerseyNumber: 48, name: "Noah Martin" },
  { id: 11, jerseyNumber: 71, name: "Preston Mitchell" },
  { id: 12, jerseyNumber: 19, name: "Jacob Nalbandian" },
  { id: 13, jerseyNumber: 7, name: "Jimmy Rigitano" },
  { id: 14, jerseyNumber: 57, name: "Baylen Sahs" },
  { id: 15, jerseyNumber: 92, name: "Dylan Stucker" },
  { id: 16, jerseyNumber: 21, name: "William Winkofsky" },
];
