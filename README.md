# 🏒 ShotMat --- Hockey Shot Map

[![Live
Demo](https://img.shields.io/badge/demo–live-brightgreen)](https://dkranzmat.github.io/shotmat/)
[![GitHub
Repo](https://img.shields.io/badge/source–code-blue)](https://github.com/DKranzMAT/shotmat)

------------------------------------------------------------------------

## 📍 Live Demo

👉 **https://dkranzmat.github.io/shotmat/**

------------------------------------------------------------------------

## 🏒 Overview

**ShotMat** is an interactive hockey analytics tool that plots shot
events on a full NHL-regulation rink.\
It uses **React**, **TypeScript**, **Tailwind CSS**, and **SVG** to
create a fast, clean, and fully static tool that works for youth teams,
NHL teams, or custom rosters.

------------------------------------------------------------------------

## 🧠 Features

### 🎯 Shot Tracking & Visualization

-   Precise **x/y coordinate plotting**
-   SVG-based rink for crisp rendering
-   Color-coded shot results:
    -   🟦 Shot\
    -   🟨 Miss\
    -   🟥 Goal\
    -   ⬛ Blocked

### 🧬 Smart Filtering

-   Filter by **team**, **period**, **shot result**
-   Home/Away auto-detected from CSV
-   Clean 3-column filter UI

### 👤 Player Tracking

-   Select a player to isolate only their shots
-   Auto-matching via `playerNumber`
-   Dynamic header: "Tracking shots for #67"

### 🔎 Search & Roster Integration

-   Supports live search + fuzzy search (MiniSearch ready)
-   Simple player model with name + jersey number

### 🎨 Theme Modes

-   **Sabres Mode** (navy + gold)
-   **Ice Mode** (light/neutral)

### 📦 CSV Pipeline

-   Load structured hockey shot CSVs
-   Auto-parse periods, teams, results, coordinates
-   Optional fields: `playerNumber`, `xg`, `shot_type`, `handed`

### ⚡ Performance & Deployment

-   Vite-powered development
-   Zero backend
-   GitHub Action automatically rebuilds & deploys to Pages

------------------------------------------------------------------------

## ⚙️ Tech Stack

-   **React + TypeScript**
-   **Vite**
-   **Tailwind CSS**
-   **SVG Rink Rendering**
-   **GitHub Pages** (static hosting)
-   **GitHub Actions** (auto deploy)
-   Optional search powered by **MiniSearch**

------------------------------------------------------------------------

## 🚀 Getting Started

``` bash
git clone https://github.com/DKranzMAT/shotmat.git
cd shotmat
npm install
npm run dev
npm run build
```

Deployment happens automatically when you push to `main`.

------------------------------------------------------------------------

## 📊 Example CSV (`shots_sample.csv`)

  --------------------------------------------------------------------------------------
  game_id   period   time    team   player    playerNumber    result   x     y    xg
  --------- -------- ------- ------ --------- --------------- -------- ----- ---- ------
  1001      1        12:44   Home   Dylan     67              Goal     22    -8   0.13

  1001      1        07:10   Away   Noah      14              Goal     -15   12   0.09

  1001      2        05:33   Home   Stucker   21              Miss     -5    -3   0.04
  --------------------------------------------------------------------------------------

`playerNumber` enables roster auto-matching.

------------------------------------------------------------------------

## 🖼️ App Preview (v2.0)

![ShotMat Preview](public/shotmat-preview2.0.png)

------------------------------------------------------------------------

## 🧑‍💻 Author

**David Kranz**\
Front-End Developer • UI Engineer\
Portfolio: https://davidkranzwordpress.com\
GitHub: https://github.com/DKranzMAT
