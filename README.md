# Rex Run 🦕

A mobile-first dinosaur platformer inspired by Super Mario, built with **Phaser 3** and packaged for iOS & Android via **Capacitor**.

## Features
- **20 levels** across 4 worlds: Jungle · Desert · Ice Cave · Volcano
- **4 touch buttons**: Left, Right, Jump, Roar
- **Stomp**: press Jump mid-air to ground pound enemies
- **Roar**: area shockwave that stuns enemies and destroys boulders
- **3 enemy types**: Raptor, Pterodactyl, Boulder
- **Geometric art style** — all graphics generated in code, no external assets
- Score system with ranks (D → S) and collectible bones
- Full Game Over / Level Complete / Win screens

## Controls
| Button | Action |
|---|---|
| ◀ | Move left |
| ▶ | Move right |
| ▲ JUMP | Jump; press again mid-air = **Stomp** (ground pound) |
| 🌊 ROAR | Shockwave attack (3 second cooldown) |
| Z (keyboard) | Roar (desktop testing) |

## Setup

### Web / Desktop
```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
```

### iOS
```bash
npm run build
npx cap add ios
npx cap sync
npx cap run ios
```

### Android
```bash
npm run build
npx cap add android
npx cap sync
npx cap run android
```

## Tech Stack
- [Phaser 3](https://phaser.io) — 2D game engine
- [Vite](https://vitejs.dev) — build tool
- [Capacitor](https://capacitorjs.com) — iOS & Android native wrapper

## Publishing to App Stores
1. Build: `npm run build`
2. Sync: `npx cap sync`
3. **iOS**: Open `ios/` in Xcode → Archive → Upload to App Store Connect
4. **Android**: Open `android/` in Android Studio → Generate Signed Bundle/APK

## Level Design
| World | Levels | Theme | New mechanics |
|---|---|---|---|
| 1 Jungle | 1–5 | Green forest | Walking, jumping, basic raptors |
| 2 Desert | 6–10 | Sand & heat | Boulders, wider gaps |
| 3 Ice Cave | 11–15 | Blue ice | More pterodactyls, tighter platforms |
| 4 Volcano | 16–20 | Lava pits | All enemy types, lava gaps |
