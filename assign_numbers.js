import fs from "fs";

const roster = {
  "BERTUCA": 37,
  "CLARKE": 3,
  "CROWE": 23,
  "CULEN": 12,
  "CUSTER": 26,
  "FOX": 10,
  "GRAVELINE": 39,
  "KRANZ": 67,        // Dylan boost! 💪
  "LARKEN": 84,
  "MARTIN": 48,
  "MITCHELL": 71,
  "NALBANDIAN": 19,
  "RIGITANO": 7,
  "SAHS": 57,
  "STUCKER": 92,
  "WINKOFSKY": 21,
};

const inputPath = "public/shots_sample.csv";
const csv = fs.readFileSync(inputPath, "utf8");
const lines = csv.trim().split("\n");

let header = lines.shift().trim();

// Ensure header includes playerNumber
if (!header.includes("playerNumber")) {
  header = header.replace("player,", "player,playerNumber,");
}

const updated = [header];

for (const line of lines) {
  const parts = line.split(",");

  const lastName = parts[4].trim().toUpperCase(); // player name column
  const num = roster[lastName] ?? "";

  // Insert playerNumber after player name
  parts.splice(5, 0, num);

  updated.push(parts.join(","));
}

fs.writeFileSync(inputPath, updated.join("\n"));
console.log("Jersey numbers assigned!");
