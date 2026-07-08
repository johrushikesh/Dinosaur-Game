# Mobile Game Market Research & New Game Concepts

**Goal:** Identify the most-played mobile games on the App Store and Play Store for the
10–30 age group (smartphone owners or shared-household devices), extract the traits that
make them catchy, and design new multi-layered HTML games from those traits.

**Research date:** July 2026 (data covers full-year 2025 + early-2026 store rankings)

---

## 1. Most-Played Mobile Games (App Store + Play Store)

### 1.1 By downloads (2025, both stores combined — AppMagic/PocketGamer data)

| # | Game | Downloads 2025 | Genre | Core audience |
|---|------|----------------|-------|---------------|
| 1 | **Block Blast!** | 356.2 M | Block puzzle | 10–30+ (broadest reach; #1 on App Store two years running, 89 M iOS installs) |
| 2 | **Roblox** | 286 M | UGC platform / sandbox | 9–16 core, growing 16–24 (85.3 M daily active users, ~380 M monthly) |
| 3 | **Free Fire + Free Fire MAX** | 279.6 M | Battle royale shooter | 13–25 (#1 on Google Play) |
| 4 | **Subway Surfers** | 186.7 M | Endless runner | 10–20 (14 years old and still top-5) |
| 5 | **Pizza Ready!** | 161 M | Hypercasual idle/management | 10–18 (top hypercasual title of the year) |

Worldwide mobile game downloads reached **5.92 billion in 2025** (up 4 % YoY).
Fastest-growing puzzle sub-genres: mahjong-solitaire (+189 % YoY) and tile-match (+28 % YoY).

### 1.2 By revenue (2025 — what keeps 16–30s paying and playing)

| # | Game | Revenue 2025 | Genre |
|---|------|--------------|-------|
| 1 | Honor of Kings | ~$2.4 B | MOBA |
| 2 | Last War: Survival | ~$2.2 B | Strategy / merge-runner hybrid |
| 3 | Roblox | ~$2.0 B | UGC platform |
| 4 | Whiteout Survival | ~$1.9 B | Survival strategy |
| 5 | Royal Match | ~$1.9 B | Match-3 puzzle |
| — | Monopoly GO!, PUBG Mobile, Candy Crush Saga | $1 B+ each | Casual board / shooter / match-3 |
| — | Brawl Stars | $627.5 M (+147 % YoY) | Hero arena brawler |

### 1.3 By audience segment (10–30 focus)

**Ages 10–15 (often on shared household phones):**
Roblox, Minecraft, Brawl Stars, Subway Surfers, Toca Boca World (top-grossing kids app),
Among Us, Block Blast, Pizza Ready. Short sessions, no reading barrier, bright geometric art.

**Ages 16–24 (Gen Z, own phone):**
Call of Duty: Mobile (surveyed Gen Z favorite), Free Fire, PUBG Mobile, Fortnite,
Brawl Stars, Clash Royale, Roblox, 8 Ball Pool, Genshin Impact.
Key stats: 92 % of Gen Z play mobile games; 81 % play games averaging ~7 h 20 m/week;
71 % are drawn by competitive elements and 68 % by cooperative ones; favorite genre is
adventure (45 %). Teens 13–17: 85 % play, averaging ~96 minutes daily.

**Ages 24–30 (commute / break-time players):**
Candy Crush Saga, Royal Match, Block Blast, Monopoly GO!, Wordle, Vampire-Survivors-likes
(Survivor.io, Archero). Puzzle skews older; sessions fit "one level while I wait."

---

## 2. What Makes These Games Catchy — Trait Extraction

| Trait | Where it's proven | Why it hooks |
|-------|-------------------|--------------|
| **One-thumb input** (tap/swipe/drag only) | Subway Surfers, Flappy Bird, Block Blast | Zero tutorial; playable on any phone, one hand, 10 seconds in |
| **Fail fast, restart instantly** | Subway Surfers, Flappy Bird | Death costs 1 tap, so "one more run" is frictionless |
| **Line-clear / merge dopamine** | Tetris, Block Blast, 2048 | A visible, noisy moment of order-from-chaos every few seconds |
| **Cascade / combo multipliers** | Candy Crush, Royal Match | Variable-ratio rewards — sometimes the board explodes for you |
| **Near-miss + speed ramp** | Subway Surfers, Temple Run | Adrenaline scales with skill; the game gets harder because *you* got better |
| **Level-up choice (1 of 3)** | Vampire Survivors, Survivor.io, Archero | Micro-strategy every 30 s; every run builds a different "build" |
| **Swarm power fantasy** | Vampire Survivors, Last War | From weak to screen-clearing god in 5 minutes |
| **Collectible characters / skins** | Brawl Stars, Fortnite, Subway Surfers | Long-term goals + self-expression; the meta layer beyond a single run |
| **Daily streaks & daily challenges** | Wordle, Monopoly GO!, Duolingo | A reason to return *today*, not someday |
| **Missions / quests layered over the core loop** | Subway Surfers word hunts, Fortnite quests | Gives a purpose to each run beyond high score |
| **Leaderboard / beat-your-best** | 8 Ball Pool, Stumble Guys | Competitive pull (71 % of Gen Z) even in single-player via personal bests |
| **Juice** (particles, screen-shake, pitch-rising sfx) | Candy Crush, Fruit Ninja | Feedback IS the reward; cheap to build, huge retention effect |
| **Sessions under 3 minutes** | All hypercasual | Fits school breaks, commutes, shared-phone time slices |

**Design conclusion:** the winning formula for 10–30 is a *hypercasual-simple core loop*
wrapped in *midcore meta layers* (upgrades, collections, streaks, missions). The industry
calls this **hybrid-casual** — it was the fastest-growing category of 2024–2026.

---

## 3. The Three New Games (HTML5, single file each, phone-first)

Each game is one self-contained `.html` file — no build step, no assets, no network.
Open it in any browser (or serve the folder) and it runs. Touch and keyboard both work.
All progress persists in `localStorage`. All art is code-drawn (geometric neon style),
all sound is synthesized with WebAudio.

### Game 1 — **SKY DASH** (`games/sky-dash.html`)
*Endless runner — the 10–18 magnet*

| Layer | Mechanic | Borrowed from |
|-------|----------|---------------|
| Core loop | 3-lane pseudo-3D endless run: swipe to switch lanes, jump, slide | Subway Surfers, Temple Run |
| Session layer | Coins, magnet / shield / 2× power-ups, near-miss bonus, speed ramp | Subway Surfers, Jetpack Joyride |
| Meta layer 1 | Coin wallet → unlockable runner skins | Subway Surfers, Brawl Stars |
| Meta layer 2 | 3 rotating missions per run (collect X coins, N near-misses, survive T seconds) | Fortnite quests |
| Meta layer 3 | Daily-streak login bonus + best-score chase | Monopoly GO!, Wordle |

### Game 2 — **BLOCK REX** (`games/block-rex.html`)
*Drag-and-drop block puzzle — the broadest-reach game (10–30+)*

| Layer | Mechanic | Borrowed from |
|-------|----------|---------------|
| Core loop | 8×8 grid; drag 1 of 3 pieces; full rows/columns clear | Block Blast!, Tetris |
| Session layer | Combo streaks with multipliers, "all clear" bonus, juice explosions | Candy Crush cascades |
| Meta layer 1 | Daily Challenge: same seeded piece sequence for everyone each day | Wordle daily |
| Meta layer 2 | Unlockable board themes earned with lifetime score | Subway Surfers collections |
| Meta layer 3 | Best-score + daily-best leaderboard chase | Block Blast |

### Game 3 — **NOVA SWARM** (`games/nova-swarm.html`)
*Survivor-style arena shooter — the 16–30 midcore hook*

| Layer | Mechanic | Borrowed from |
|-------|----------|---------------|
| Core loop | Top-down arena; you auto-fire at the nearest enemy; just move to survive | Vampire Survivors, Survivor.io |
| Session layer | XP gems → level-up: pick 1 of 3 upgrades (multishot, orbitals, ricochet…) | Archero, Vampire Survivors |
| Session layer | Wave escalation + boss every 5 waves | Survivor.io |
| Meta layer 1 | 3 unlockable pilots with different stats (unlock via lifetime kills) | Brawl Stars |
| Meta layer 2 | Survival-time + kill-count personal records | 8 Ball Pool competitive pull |

### Why these three
They deliberately cover the three biggest verticals from §1 with zero overlap:
**runner** (hypercasual, younger skew), **block puzzle** (the single most-downloaded genre
of 2025, all ages), and **survivor arena** (the hottest hybrid-casual genre for
16–30). Together they span the full 10–30 target. Each is multi-layered:
a ≤3-minute core loop, an in-session escalation layer, and persistent meta layers
(collections, streaks, dailies, records) that make players come back.

All three are built mobile-first (portrait, one-thumb) so they can later be wrapped with
Capacitor — the same pipeline this repo already uses for Rex Run — if you decide an app
store release is worth it.

---

## Sources

- [PocketGamer.biz — The most downloaded mobile games of 2025](https://www.pocketgamer.biz/the-most-downloaded-mobile-games-of-2025/)
- [PocketGamer.biz — The top grossing mobile games of 2025](https://www.pocketgamer.biz/the-top-grossing-mobile-games-of-2025/)
- [mobilegamer.biz — 2025's top grossing mobile games](https://mobilegamer.biz/the-top-grossing-mobile-games-of-2025/)
- [Business of Apps — Most Popular Mobile Games (2026)](https://www.businessofapps.com/data/most-popular-mobile-games/)
- [Udonis — 100 Most Downloaded Mobile Games of All Time (2026 update)](https://www.blog.udonis.co/mobile-marketing/mobile-games/most-downloaded-mobile-games)
- [YPulse — Gen Z's Favorite Video and Mobile Games in 2025](https://www.ypulse.com/article/2025/09/11/gen-zs-favorite-video-and-mobile-games-in-2025/)
- [SQ Magazine — Gen Z gaming platform preferences statistics](https://sqmagazine.co.uk/gen-z-gaming-platform-preferences-statistics/)
- [SQ Magazine — Mobile games statistics 2026](https://sqmagazine.co.uk/mobile-games-statistics/)
- [MAF — 70+ Key Mobile Gaming Statistics for 2026](https://maf.ad/en/blog/mobile-gaming-statistics/)
- [Yu-kai Chou — Why Candy Crush is so addicting (game mechanics research)](https://yukaichou.com/gamification-study/game-mechanics-research-candy-crush-addicting/)
- [Singular — Top mobile games 2026](https://www.singular.net/blog/top-mobile-games/)
