export const WORLDS = [
  { name: 'Jungle',    sky: 0x5B93C5, skyBottom: 0x7CBF5A, ground: 0x2D5A1B, platform: 0x5C3D11, accent: 0x90EE90, lava: false },
  { name: 'Desert',   sky: 0xD4956A, skyBottom: 0xE8C882, ground: 0xB8833A, platform: 0x7A5A18, accent: 0xFFD700, lava: false },
  { name: 'Ice Cave', sky: 0x8BC8E0, skyBottom: 0xB0DCF0, ground: 0x3A78B4, platform: 0x5A9AC8, accent: 0xE0F8FF, lava: false },
  { name: 'Volcano',  sky: 0x1A0800, skyBottom: 0x4A1800, ground: 0x5A1800, platform: 0x9A2800, accent: 0xFF4500, lava: true  },
];

// Ground segments: [x, width]  (ground top is at GROUND_Y=460, fills to bottom)
// Platforms: {x, y, w}         (y = top of platform surface)
// Enemies: {type, x, y?, dir}  (type: raptor|pterodactyl|boulder; y for pterodactyl = flight height; dir: 1=right,-1=left)
// Bones: {x, y}
// startX, goalX

export const LEVELS = [
  // ── WORLD 1: Jungle ────────────────────────────────────────────────────────
  {
    world: 0, width: 2400, startX: 100,
    ground: [[0, 2400]],
    platforms: [
      {x:380, y:370, w:120}, {x:680, y:310, w:140},
      {x:1080, y:350, w:160}, {x:1480, y:300, w:120}, {x:1800, y:370, w:140},
    ],
    enemies: [
      {type:'raptor', x:620, dir:-1},
      {type:'raptor', x:1300, dir:1},
    ],
    bones: [
      {x:400,y:340},{x:450,y:340},{x:500,y:340},
      {x:700,y:270},{x:760,y:270},
      {x:1100,y:310},{x:1200,y:430},{x:1900,y:340},
    ],
    goalX: 2200,
  },
  {
    world: 0, width: 2800, startX: 100,
    ground: [[0, 720], [840, 920], [1870, 930]],
    platforms: [
      {x:740, y:370, w:100},
      {x:1800, y:350, w:100},
    ],
    enemies: [
      {type:'raptor', x:400, dir:1},
      {type:'raptor', x:1300, dir:-1},
      {type:'raptor', x:2200, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:500,y:430},
      {x:750,y:330},{x:1820,y:310},
      {x:2100,y:430},{x:2400,y:430},
    ],
    goalX: 2600,
  },
  {
    world: 0, width: 3000, startX: 100,
    ground: [[0, 600], [700, 500], [1320, 600], [2040, 960]],
    platforms: [
      {x:640, y:360, w:100}, {x:1280, y:340, w:100},
      {x:900,  y:280, w:120}, {x:1900, y:300, w:140},
    ],
    enemies: [
      {type:'raptor', x:350, dir:1},
      {type:'pterodactyl', x:900, y:200, dir:-1},
      {type:'raptor', x:1600, dir:-1},
      {type:'pterodactyl', x:2200, y:240, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:660,y:320},{x:920,y:240},{x:1300,y:300},
      {x:1500,y:430},{x:1920,y:260},{x:2400,y:430},
    ],
    goalX: 2800,
  },
  {
    world: 0, width: 3200, startX: 100,
    ground: [[0, 500], [620, 480], [1220, 560], [1920, 600], [2660, 540]],
    platforms: [
      {x:560, y:350, w:100}, {x:1160, y:330, w:100},
      {x:700,  y:260, w:120}, {x:1400, y:280, w:120},
      {x:1860, y:350, w:100}, {x:2600, y:330, w:100},
    ],
    enemies: [
      {type:'raptor', x:300, dir:1},
      {type:'raptor', x:1000, dir:-1},
      {type:'pterodactyl', x:700, y:210, dir:1},
      {type:'pterodactyl', x:1700, y:230, dir:-1},
      {type:'raptor', x:2200, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:580,y:310},{x:710,y:220},{x:1180,y:290},
      {x:1420,y:240},{x:1880,y:310},{x:2620,y:290},{x:2900,y:430},
    ],
    goalX: 3000,
  },
  {
    world: 0, width: 3600, startX: 100,
    ground: [[0, 400], [520, 400], [1040, 380], [1540, 460], [2140, 420], [2700, 900]],
    platforms: [
      {x:460, y:340, w:100}, {x:980, y:320, w:100}, {x:1480, y:300, w:100},
      {x:640,  y:240, w:120}, {x:1220, y:260, w:120},
      {x:2080, y:340, w:140}, {x:2640, y:310, w:140},
    ],
    enemies: [
      {type:'raptor', x:280, dir:1}, {type:'raptor', x:800, dir:-1},
      {type:'raptor', x:1700, dir:1}, {type:'raptor', x:2400, dir:-1},
      {type:'pterodactyl', x:640, y:190, dir:1},
      {type:'pterodactyl', x:1500, y:210, dir:-1},
      {type:'pterodactyl', x:2200, y:220, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:480,y:300},{x:660,y:200},{x:1000,y:280},
      {x:1240,y:220},{x:1500,y:260},{x:2100,y:300},{x:2660,y:270},{x:3200,y:430},
    ],
    goalX: 3400,
  },

  // ── WORLD 2: Desert ────────────────────────────────────────────────────────
  {
    world: 1, width: 3200, startX: 100,
    ground: [[0, 460], [600, 480], [1240, 480], [1900, 560], [2640, 560]],
    platforms: [
      {x:540, y:350, w:100}, {x:1180, y:330, w:100},
      {x:1840, y:310, w:100}, {x:2580, y:300, w:120},
    ],
    enemies: [
      {type:'raptor', x:300, dir:1}, {type:'raptor', x:1000, dir:-1},
      {type:'boulder', x:1800, dir:-1}, {type:'raptor', x:2300, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:560,y:310},{x:1200,y:290},{x:1860,y:270},
      {x:2100,y:430},{x:2600,y:260},{x:2900,y:430},
    ],
    goalX: 3000,
  },
  {
    world: 1, width: 3400, startX: 100,
    ground: [[0, 380], [520, 400], [1080, 440], [1700, 480], [2380, 500], [3060, 340]],
    platforms: [
      {x:460, y:330, w:100}, {x:1020, y:310, w:100},
      {x:1640, y:290, w:100}, {x:2320, y:270, w:120},
      {x:700, y:240, w:120}, {x:1900, y:220, w:120},
    ],
    enemies: [
      {type:'raptor', x:250, dir:1},
      {type:'pterodactyl', x:700, y:190, dir:1},
      {type:'boulder', x:1500, dir:-1},
      {type:'raptor', x:1900, dir:-1},
      {type:'pterodactyl', x:2400, y:210, dir:-1},
      {type:'boulder', x:3000, dir:-1},
    ],
    bones: [
      {x:150,y:430},{x:480,y:290},{x:720,y:200},{x:1040,y:270},
      {x:1660,y:250},{x:1920,y:180},{x:2340,y:230},{x:3080,y:430},
    ],
    goalX: 3200,
  },
  {
    world: 1, width: 3600, startX: 100,
    ground: [[0, 340], [480, 360], [1000, 440], [1640, 400], [2260, 460], [2960, 640]],
    platforms: [
      {x:420, y:320, w:100}, {x:940, y:300, w:100},
      {x:1580, y:270, w:100}, {x:2200, y:250, w:120},
      {x:660, y:220, w:120}, {x:1300, y:200, w:120}, {x:2900, y:280, w:140},
    ],
    enemies: [
      {type:'raptor', x:200, dir:1}, {type:'raptor', x:700, dir:-1},
      {type:'boulder', x:900, dir:-1}, {type:'raptor', x:1400, dir:1},
      {type:'pterodactyl', x:1300, y:160, dir:1},
      {type:'boulder', x:2000, dir:-1}, {type:'raptor', x:2500, dir:-1},
      {type:'pterodactyl', x:2600, y:200, dir:-1},
    ],
    bones: [
      {x:150,y:430},{x:440,y:280},{x:680,y:180},{x:960,y:260},
      {x:1320,y:160},{x:1600,y:230},{x:2220,y:210},{x:2920,y:240},{x:3400,y:430},
    ],
    goalX: 3400,
  },
  {
    world: 1, width: 3800, startX: 100,
    ground: [[0, 300], [440, 380], [1000, 360], [1620, 420], [2240, 400], [2900, 500], [3600, 200]],
    platforms: [
      {x:380, y:310, w:100}, {x:940, y:290, w:100},
      {x:1560, y:270, w:100}, {x:2180, y:250, w:100},
      {x:2840, y:230, w:120}, {x:620, y:210, w:120},
      {x:1280, y:190, w:120}, {x:3540, y:260, w:160},
    ],
    enemies: [
      {type:'raptor', x:200, dir:1}, {type:'boulder', x:700, dir:-1},
      {type:'raptor', x:1100, dir:-1}, {type:'pterodactyl', x:1300, y:160, dir:1},
      {type:'boulder', x:1800, dir:-1}, {type:'raptor', x:2000, dir:1},
      {type:'pterodactyl', x:2300, y:200, dir:-1},
      {type:'boulder', x:2700, dir:-1}, {type:'raptor', x:3100, dir:1},
    ],
    bones: [
      {x:140,y:430},{x:400,y:270},{x:640,y:170},{x:960,y:250},
      {x:1300,y:150},{x:1580,y:230},{x:2200,y:210},{x:2860,y:190},
      {x:3200,y:430},{x:3560,y:220},
    ],
    goalX: 3600,
  },
  {
    world: 1, width: 4000, startX: 100,
    ground: [[0, 280], [400, 340], [920, 360], [1500, 400], [2100, 380], [2740, 440], [3400, 600]],
    platforms: [
      {x:340, y:290, w:100}, {x:860, y:270, w:100},
      {x:1440, y:250, w:100}, {x:2040, y:230, w:100},
      {x:2680, y:210, w:120}, {x:3340, y:230, w:140},
      {x:600, y:190, w:120}, {x:1200, y:170, w:120}, {x:1800, y:160, w:140},
    ],
    enemies: [
      {type:'raptor', x:180, dir:1}, {type:'pterodactyl', x:600, y:150, dir:1},
      {type:'boulder', x:800, dir:-1}, {type:'raptor', x:1100, dir:-1},
      {type:'pterodactyl', x:1400, y:130, dir:-1}, {type:'boulder', x:1700, dir:-1},
      {type:'raptor', x:2000, dir:1}, {type:'pterodactyl', x:2200, y:170, dir:1},
      {type:'boulder', x:2500, dir:-1}, {type:'raptor', x:2900, dir:-1},
      {type:'pterodactyl', x:3100, y:190, dir:-1}, {type:'boulder', x:3600, dir:-1},
    ],
    bones: [
      {x:140,y:430},{x:360,y:250},{x:620,y:150},{x:880,y:230},
      {x:1220,y:130},{x:1460,y:210},{x:1820,y:120},{x:2060,y:190},
      {x:2700,y:170},{x:3360,y:190},{x:3800,y:430},
    ],
    goalX: 3800,
  },

  // ── WORLD 3: Ice Cave ──────────────────────────────────────────────────────
  {
    world: 2, width: 3400, startX: 100,
    ground: [[0, 500], [660, 480], [1320, 520], [2020, 540], [2760, 640]],
    platforms: [
      {x:600, y:340, w:120}, {x:1260, y:320, w:120},
      {x:1960, y:300, w:120}, {x:2700, y:280, w:140},
      {x:860, y:240, w:120},
    ],
    enemies: [
      {type:'raptor', x:350, dir:1}, {type:'pterodactyl', x:860, y:190, dir:1},
      {type:'raptor', x:1400, dir:-1}, {type:'pterodactyl', x:1600, y:210, dir:-1},
      {type:'boulder', x:2200, dir:-1}, {type:'raptor', x:2900, dir:1},
    ],
    bones: [
      {x:200,y:430},{x:620,y:300},{x:880,y:200},{x:1280,y:280},
      {x:1980,y:260},{x:2720,y:240},{x:3100,y:430},
    ],
    goalX: 3200,
  },
  {
    world: 2, width: 3600, startX: 100,
    ground: [[0, 420], [560, 460], [1200, 440], [1840, 500], [2560, 480], [3260, 340]],
    platforms: [
      {x:500, y:320, w:100}, {x:1140, y:300, w:100},
      {x:1780, y:280, w:100}, {x:2500, y:260, w:120},
      {x:720, y:220, w:120}, {x:1440, y:200, w:120}, {x:2200, y:180, w:140},
    ],
    enemies: [
      {type:'raptor', x:280, dir:1}, {type:'pterodactyl', x:720, y:170, dir:1},
      {type:'boulder', x:1000, dir:-1}, {type:'raptor', x:1400, dir:-1},
      {type:'pterodactyl', x:1440, y:150, dir:-1}, {type:'raptor', x:2100, dir:1},
      {type:'boulder', x:2400, dir:-1}, {type:'pterodactyl', x:2600, y:200, dir:1},
      {type:'raptor', x:3000, dir:-1},
    ],
    bones: [
      {x:150,y:430},{x:520,y:280},{x:740,y:180},{x:1160,y:260},
      {x:1460,y:160},{x:1800,y:240},{x:2220,y:140},{x:2520,y:220},{x:3280,y:430},
    ],
    goalX: 3400,
  },
  {
    world: 2, width: 3800, startX: 100,
    ground: [[0, 360], [500, 400], [1100, 420], [1740, 440], [2420, 460], [3140, 660]],
    platforms: [
      {x:440, y:300, w:100}, {x:1040, y:280, w:100},
      {x:1680, y:260, w:100}, {x:2360, y:240, w:120},
      {x:660, y:200, w:120}, {x:1380, y:180, w:120},
      {x:2080, y:160, w:140}, {x:3080, y:240, w:160},
    ],
    enemies: [
      {type:'raptor', x:240, dir:1}, {type:'pterodactyl', x:660, y:150, dir:1},
      {type:'boulder', x:900, dir:-1}, {type:'raptor', x:1200, dir:-1},
      {type:'pterodactyl', x:1380, y:130, dir:-1}, {type:'boulder', x:1600, dir:-1},
      {type:'raptor', x:1900, dir:1}, {type:'pterodactyl', x:2080, y:110, dir:1},
      {type:'boulder', x:2300, dir:-1}, {type:'raptor', x:2700, dir:-1},
      {type:'pterodactyl', x:2900, y:180, dir:1}, {type:'boulder', x:3400, dir:-1},
    ],
    bones: [
      {x:130,y:430},{x:460,y:260},{x:680,y:160},{x:1060,y:240},
      {x:1400,y:140},{x:1700,y:220},{x:2100,y:120},{x:2380,y:200},
      {x:3100,y:200},{x:3600,y:430},
    ],
    goalX: 3600,
  },
  {
    world: 2, width: 4000, startX: 100,
    ground: [[0, 320], [460, 380], [1040, 400], [1680, 420], [2380, 440], [3100, 500], [3840, 160]],
    platforms: [
      {x:400, y:280, w:100}, {x:980, y:260, w:100},
      {x:1620, y:240, w:100}, {x:2320, y:220, w:100},
      {x:620, y:180, w:120}, {x:1300, y:160, w:120},
      {x:2060, y:140, w:140}, {x:2900, y:160, w:140}, {x:3780, y:220, w:160},
    ],
    enemies: [
      {type:'raptor', x:200, dir:1}, {type:'pterodactyl', x:620, y:130, dir:1},
      {type:'boulder', x:840, dir:-1}, {type:'raptor', x:1100, dir:-1},
      {type:'pterodactyl', x:1300, y:110, dir:-1}, {type:'boulder', x:1500, dir:-1},
      {type:'raptor', x:1800, dir:1}, {type:'pterodactyl', x:2060, y:90, dir:1},
      {type:'boulder', x:2280, dir:-1}, {type:'raptor', x:2600, dir:-1},
      {type:'pterodactyl', x:2900, y:120, dir:-1}, {type:'boulder', x:3200, dir:-1},
      {type:'raptor', x:3500, dir:1}, {type:'boulder', x:3780, dir:-1},
    ],
    bones: [
      {x:120,y:430},{x:420,y:240},{x:640,y:140},{x:1000,y:220},
      {x:1320,y:120},{x:1640,y:200},{x:2080,y:100},{x:2340,y:180},
      {x:2920,y:120},{x:3800,y:180},{x:3900,y:430},
    ],
    goalX: 3800,
  },
  {
    world: 2, width: 4200, startX: 100,
    ground: [[0, 300], [420, 340], [960, 360], [1580, 400], [2200, 420], [2920, 480], [3660, 540]],
    platforms: [
      {x:360, y:260, w:100}, {x:900, y:240, w:100},
      {x:1520, y:220, w:100}, {x:2140, y:200, w:100},
      {x:580, y:160, w:120}, {x:1260, y:140, w:120},
      {x:1960, y:120, w:140}, {x:2720, y:140, w:140},
      {x:3460, y:220, w:160}, {x:800, y:100, w:100},
    ],
    enemies: [
      {type:'raptor', x:180, dir:1}, {type:'pterodactyl', x:580, y:110, dir:1},
      {type:'boulder', x:760, dir:-1}, {type:'raptor', x:1000, dir:-1},
      {type:'pterodactyl', x:1260, y:90, dir:-1}, {type:'boulder', x:1400, dir:-1},
      {type:'raptor', x:1700, dir:1}, {type:'pterodactyl', x:1960, y:70, dir:1},
      {type:'boulder', x:2100, dir:-1}, {type:'raptor', x:2400, dir:-1},
      {type:'pterodactyl', x:2720, y:100, dir:-1}, {type:'boulder', x:2900, dir:-1},
      {type:'raptor', x:3200, dir:1}, {type:'pterodactyl', x:3460, y:170, dir:1},
      {type:'boulder', x:3800, dir:-1},
    ],
    bones: [
      {x:110,y:430},{x:380,y:220},{x:600,y:120},{x:820,y:60},
      {x:1280,y:100},{x:1540,y:180},{x:1980,y:80},{x:2160,y:160},
      {x:2740,y:100},{x:3480,y:180},{x:4000,y:430},
    ],
    goalX: 4000,
  },

  // ── WORLD 4: Volcano ───────────────────────────────────────────────────────
  {
    world: 3, width: 3600, startX: 100,
    ground: [[0, 380], [520, 440], [1160, 480], [1880, 500], [2660, 540], [3400, 200]],
    platforms: [
      {x:460, y:300, w:120}, {x:1100, y:280, w:120},
      {x:1820, y:260, w:120}, {x:2600, y:240, w:140},
      {x:720, y:200, w:120}, {x:1500, y:180, w:120},
    ],
    enemies: [
      {type:'raptor', x:280, dir:1}, {type:'boulder', x:600, dir:-1},
      {type:'pterodactyl', x:720, y:150, dir:1}, {type:'raptor', x:1200, dir:-1},
      {type:'boulder', x:1600, dir:-1}, {type:'raptor', x:2100, dir:1},
      {type:'pterodactyl', x:2200, y:190, dir:-1}, {type:'boulder', x:2800, dir:-1},
      {type:'raptor', x:3000, dir:1},
    ],
    bones: [
      {x:160,y:430},{x:480,y:260},{x:740,y:160},{x:1120,y:240},
      {x:1840,y:220},{x:2620,y:200},{x:3100,y:430},
    ],
    goalX: 3400,
  },
  {
    world: 3, width: 3800, startX: 100,
    ground: [[0, 340], [480, 380], [1080, 420], [1760, 460], [2520, 480], [3360, 440]],
    platforms: [
      {x:420, y:280, w:100}, {x:1020, y:260, w:100},
      {x:1700, y:240, w:100}, {x:2460, y:220, w:120},
      {x:640, y:180, w:120}, {x:1380, y:160, w:120},
      {x:2180, y:140, w:140}, {x:3100, y:220, w:140},
    ],
    enemies: [
      {type:'raptor', x:220, dir:1}, {type:'boulder', x:500, dir:-1},
      {type:'pterodactyl', x:640, y:130, dir:1}, {type:'raptor', x:900, dir:-1},
      {type:'boulder', x:1200, dir:-1}, {type:'raptor', x:1400, dir:1},
      {type:'pterodactyl', x:1380, y:110, dir:-1}, {type:'boulder', x:1900, dir:-1},
      {type:'raptor', x:2200, dir:-1}, {type:'pterodactyl', x:2460, y:170, dir:1},
      {type:'boulder', x:2800, dir:-1}, {type:'raptor', x:3200, dir:1},
      {type:'boulder', x:3500, dir:-1},
    ],
    bones: [
      {x:140,y:430},{x:440,y:240},{x:660,y:140},{x:1040,y:220},
      {x:1400,y:120},{x:1720,y:200},{x:2200,y:100},{x:2480,y:180},
      {x:3120,y:180},{x:3600,y:430},
    ],
    goalX: 3600,
  },
  {
    world: 3, width: 4000, startX: 100,
    ground: [[0, 300], [440, 360], [1040, 380], [1720, 420], [2480, 440], [3340, 460], [4060, 100]],
    platforms: [
      {x:380, y:260, w:100}, {x:980, y:240, w:100},
      {x:1660, y:220, w:100}, {x:2420, y:200, w:120},
      {x:600, y:160, w:120}, {x:1320, y:140, w:120},
      {x:2120, y:120, w:140}, {x:3080, y:140, w:140},
      {x:3800, y:200, w:160},
    ],
    enemies: [
      {type:'raptor', x:200, dir:1}, {type:'boulder', x:440, dir:-1},
      {type:'pterodactyl', x:600, y:110, dir:1}, {type:'raptor', x:800, dir:-1},
      {type:'boulder', x:1100, dir:-1}, {type:'raptor', x:1340, dir:1},
      {type:'pterodactyl', x:1320, y:90, dir:-1}, {type:'boulder', x:1600, dir:-1},
      {type:'raptor', x:1900, dir:-1}, {type:'pterodactyl', x:2120, y:70, dir:1},
      {type:'boulder', x:2300, dir:-1}, {type:'raptor', x:2600, dir:1},
      {type:'pterodactyl', x:2800, y:110, dir:-1}, {type:'boulder', x:3100, dir:-1},
      {type:'raptor', x:3400, dir:1}, {type:'boulder', x:3700, dir:-1},
      {type:'pterodactyl', x:3800, y:150, dir:1},
    ],
    bones: [
      {x:120,y:430},{x:400,y:220},{x:620,y:120},{x:1000,y:200},
      {x:1340,y:100},{x:1680,y:180},{x:2140,y:80},{x:2440,y:160},
      {x:3100,y:100},{x:3820,y:160},{x:3900,y:430},
    ],
    goalX: 3800,
  },
  {
    world: 3, width: 4200, startX: 100,
    ground: [[0, 280], [400, 320], [960, 360], [1660, 400], [2460, 420], [3380, 460], [4300, 100]],
    platforms: [
      {x:340, y:240, w:100}, {x:900, y:220, w:100},
      {x:1600, y:200, w:100}, {x:2400, y:180, w:120},
      {x:560, y:140, w:120}, {x:1280, y:120, w:120},
      {x:2100, y:100, w:140}, {x:3100, y:120, w:140},
      {x:3800, y:180, w:160}, {x:800, y:80, w:100},
    ],
    enemies: [
      {type:'raptor', x:180, dir:1}, {type:'boulder', x:400, dir:-1},
      {type:'pterodactyl', x:560, y:90, dir:1}, {type:'boulder', x:700, dir:-1},
      {type:'raptor', x:800, dir:-1}, {type:'pterodactyl', x:1280, y:70, dir:-1},
      {type:'boulder', x:1500, dir:-1}, {type:'raptor', x:1700, dir:1},
      {type:'pterodactyl', x:2100, y:50, dir:1}, {type:'boulder', x:2200, dir:-1},
      {type:'raptor', x:2500, dir:-1}, {type:'boulder', x:2700, dir:-1},
      {type:'pterodactyl', x:3100, y:70, dir:-1}, {type:'raptor', x:3300, dir:1},
      {type:'boulder', x:3600, dir:-1}, {type:'raptor', x:3900, dir:-1},
      {type:'pterodactyl', x:3800, y:130, dir:1}, {type:'boulder', x:4100, dir:-1},
    ],
    bones: [
      {x:110,y:430},{x:360,y:200},{x:580,y:100},{x:820,y:40},
      {x:1300,y:80},{x:1620,y:160},{x:2120,y:60},{x:2420,y:140},
      {x:3120,y:80},{x:3820,y:140},{x:4100,y:430},
    ],
    goalX: 4000,
  },
  {
    world: 3, width: 4400, startX: 100,
    ground: [[0, 260], [380, 300], [920, 340], [1640, 380], [2460, 400], [3480, 440], [4480, 100]],
    platforms: [
      {x:320, y:220, w:100}, {x:860, y:200, w:100},
      {x:1580, y:180, w:100}, {x:2400, y:160, w:120},
      {x:540, y:120, w:120}, {x:1260, y:100, w:120},
      {x:2080, y:80, w:140}, {x:3220, y:100, w:140},
      {x:3820, y:160, w:160}, {x:4200, y:220, w:160},
      {x:760, y:60, w:100}, {x:1500, y:40, w:100},
    ],
    enemies: [
      {type:'raptor', x:170, dir:1}, {type:'boulder', x:360, dir:-1},
      {type:'pterodactyl', x:540, y:70, dir:1}, {type:'boulder', x:680, dir:-1},
      {type:'raptor', x:760, dir:-1}, {type:'pterodactyl', x:1260, y:50, dir:-1},
      {type:'boulder', x:1400, dir:-1}, {type:'raptor', x:1600, dir:1},
      {type:'boulder', x:1800, dir:-1}, {type:'pterodactyl', x:2080, y:30, dir:1},
      {type:'boulder', x:2200, dir:-1}, {type:'raptor', x:2500, dir:-1},
      {type:'boulder', x:2700, dir:-1}, {type:'pterodactyl', x:3220, y:50, dir:-1},
      {type:'raptor', x:3400, dir:1}, {type:'boulder', x:3600, dir:-1},
      {type:'raptor', x:3900, dir:-1}, {type:'boulder', x:4000, dir:-1},
      {type:'pterodactyl', x:3820, y:110, dir:1}, {type:'boulder', x:4300, dir:-1},
    ],
    bones: [
      {x:100,y:430},{x:340,y:180},{x:560,y:80},{x:780,y:20},
      {x:1280,y:60},{x:1600,y:140},{x:2100,y:40},{x:2420,y:120},
      {x:3240,y:60},{x:3840,y:120},{x:4220,y:180},{x:4350,y:430},
    ],
    goalX: 4200,
  },
];
