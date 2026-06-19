import { LEVELS, WORLDS } from '../levels/levelData.js';
import Player, { PLAYER_H, ROAR_RADIUS } from '../entities/Player.js';
import { Raptor, Pterodactyl, Boulder } from '../entities/Enemy.js';
import TouchControls from '../ui/TouchControls.js';

const GROUND_Y     = 460;
const GROUND_H     = 80;
const GAME_H       = 540;
const TILE         = 40;
const PLAT_H       = 20;
const DEATH_Y      = GAME_H + 60;

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    this.levelIndex = data.level ?? 0;
    this.totalScore = data.score ?? 0;
    this.lives      = data.lives ?? 3;
  }

  create() {
    const levelDef = LEVELS[this.levelIndex];
    const world    = WORLDS[levelDef.world];

    this._levelDef  = levelDef;
    this._world     = world;
    this._bonesLeft = levelDef.bones.length;
    this._levelOver = false;

    const W = levelDef.width;

    this.physics.world.setBounds(0, 0, W, GAME_H + 100);
    this.physics.world.gravity.y = 1100;

    this._buildBackground(world, W);
    this._buildGround(levelDef, world);
    this._buildPlatforms(levelDef, world);
    this._buildCollectibles(levelDef);
    this._buildGoal(levelDef);
    this._buildEnemies(levelDef);
    this._buildPlayer(levelDef);

    this.cameras.main.setBounds(0, 0, W, GAME_H);
    this.cameras.main.startFollow(this.player, true, 0.10, 0.10);

    this._setupCollisions();
    this._setupEvents();

    this.touch = new TouchControls(this);

    // keyboard fallback (desktop testing)
    this.cursors = this.input.keyboard.createCursorKeys();
    this._kRoar  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this._kRoarPrev = false;

    // HUD
    this._buildHUD();

    this.cameras.main.fadeIn(300);
  }

  // ── Scene construction ────────────────────────────────────────────────────

  _buildBackground(world, W) {
    const bg = this.add.graphics().setScrollFactor(0).setDepth(-5);
    bg.fillGradientStyle(world.sky, world.sky, world.skyBottom, world.skyBottom, 1);
    bg.fillRect(0, 0, this.scale.width, GAME_H);

    // Parallax mountains / clouds
    const mgfx = this.add.graphics().setScrollFactor(0.3).setDepth(-4);
    mgfx.fillStyle(world.skyBottom, 0.4);
    for (let i = 0; i < W; i += 220) {
      const h = 60 + Math.sin(i * 0.05) * 30;
      mgfx.fillTriangle(i, GROUND_Y, i + 110, GROUND_Y - h, i + 220, GROUND_Y);
    }

    // If lava world, red glow at bottom
    if (world.lava) {
      const lava = this.add.graphics().setDepth(-3);
      for (let x = 0; x < W; x += 40) {
        lava.fillStyle(0xFF2200, 0.6);
        lava.fillRect(x, GROUND_Y, 40, 80);
        lava.fillStyle(0xFF6600, 0.3);
        lava.fillRect(x, GROUND_Y, 40, 12);
      }
    }

    // Decorative BG elements per world
    const deco = this.add.graphics().setScrollFactor(0.5).setDepth(-3);
    if (world.name === 'Jungle') {
      deco.fillStyle(0x228B22, 0.35);
      for (let i = 80; i < W; i += 180) {
        deco.fillTriangle(i, GROUND_Y, i + 30, GROUND_Y - 90, i + 60, GROUND_Y);
      }
    } else if (world.name === 'Desert') {
      deco.fillStyle(0xDEB887, 0.3);
      for (let i = 60; i < W; i += 240) {
        deco.fillTriangle(i, GROUND_Y, i + 50, GROUND_Y - 70, i + 100, GROUND_Y);
      }
    } else if (world.name === 'Ice Cave') {
      deco.fillStyle(0xADD8E6, 0.3);
      for (let i = 40; i < W; i += 160) {
        deco.fillTriangle(i, 0, i + 20, 50, i + 40, 0);
      }
    } else if (world.name === 'Volcano') {
      deco.fillStyle(0x8B0000, 0.4);
      for (let i = 100; i < W; i += 300) {
        deco.fillTriangle(i, GROUND_Y, i + 60, GROUND_Y - 120, i + 120, GROUND_Y);
        deco.fillStyle(0xFF4500, 0.25);
        deco.fillTriangle(i + 45, GROUND_Y - 100, i + 60, GROUND_Y - 140, i + 75, GROUND_Y - 100);
        deco.fillStyle(0x8B0000, 0.4);
      }
    }
  }

  _buildGround(levelDef, world) {
    this.groundGroup = this.physics.add.staticGroup();
    const tkey = 'ground-tile';

    levelDef.ground.forEach(([gx, gw]) => {
      for (let x = gx; x < gx + gw; x += TILE) {
        const tile = this.groundGroup.create(x + TILE / 2, GROUND_Y + GROUND_H / 2, tkey);
        tile.setScale(1, GROUND_H / TILE);
        tile.setTint(world.ground);
        tile.refreshBody();
      }
    });
  }

  _buildPlatforms(levelDef, world) {
    this.platformGroup = this.physics.add.staticGroup();

    levelDef.platforms.forEach(({ x, y, w }) => {
      for (let px = x; px < x + w; px += TILE) {
        const tw = Math.min(TILE, x + w - px);
        const t = this.platformGroup.create(px + tw / 2, y + PLAT_H / 2, 'platform-tile');
        t.setScale(tw / TILE, 1);
        t.setTint(world.platform);
        t.refreshBody();
      }
    });
  }

  _buildCollectibles(levelDef) {
    this.bones = this.physics.add.staticGroup();
    levelDef.bones.forEach(({ x, y }) => {
      const b = this.bones.create(x, y, 'bone');
      b.setDepth(5);
      // Float the visual sprite only, not the physics body
      const visual = this.add.image(x, y, 'bone').setDepth(5);
      this.tweens.add({
        targets: visual, y: y - 6, duration: 800 + Math.random() * 200,
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
      b.setVisible(false); // hide static body sprite; visual handles display
    });
  }

  _buildGoal(levelDef) {
    const goalX = levelDef.goalX;
    const flag  = this.add.image(goalX + 22, GROUND_Y - 64 + PLAT_H / 2, 'goal-flag').setDepth(6);
    // Platform under flag
    const base = this.physics.add.staticImage(goalX, GROUND_Y - 2, 'platform-tile');
    base.setScale(2.5, 1);
    base.refreshBody();
    this._goalX  = goalX;
    this._goalObj = flag;
    this._goalBase = base;
  }

  _buildEnemies(levelDef) {
    this.enemies = this.physics.add.group();

    levelDef.enemies.forEach(({ type, x, y, dir = 1 }) => {
      let enemy;
      const groundY = GROUND_Y - (type === 'raptor' ? 44 : 0) - (type === 'boulder' ? 32 : 0);

      if (type === 'raptor') {
        enemy = new Raptor(this, x, groundY, dir);
      } else if (type === 'pterodactyl') {
        enemy = new Pterodactyl(this, x, y ?? 200, dir);
      } else if (type === 'boulder') {
        enemy = new Boulder(this, x, groundY);
      }
      if (enemy) this.enemies.add(enemy, true);
    });
  }

  _buildPlayer(levelDef) {
    const startY = GROUND_Y - PLAYER_H - 4;
    this.player = new Player(this, levelDef.startX, startY);
  }

  // ── Collisions ────────────────────────────────────────────────────────────

  _setupCollisions() {
    const p  = this.player;
    const gr = this.groundGroup;
    const pl = this.platformGroup;

    this.physics.add.collider(p, gr);
    this.physics.add.collider(p, pl);
    this.physics.add.collider(this.enemies, gr);
    this.physics.add.collider(this.enemies, pl);

    // Bone pickup
    this.physics.add.overlap(p, this.bones, (player, bone) => {
      bone.destroy();
      player.addScore(50);
      this._bonesLeft--;
      this._updateBoneHUD();
    });

    // Goal trigger
    this.physics.add.overlap(p, this._goalBase, () => {
      if (!this._levelOver) this._completeLevel();
    });

    // Enemy contact with player
    this.enemies.getChildren().forEach(e => {
      this.physics.add.overlap(p, e, (player, enemy) => {
        if (!enemy._alive) return;
        const pBottom = player.body.bottom;
        const eTop    = enemy.body.top;

        // Stomp-on-head: player falling down and lands on top
        if (player.body.velocity.y > 50 && pBottom - eTop < 20 && pBottom > eTop) {
          enemy.die();
          player.addScore(100);
          player.body.setVelocityY(-350); // bounce
        } else {
          player.hurt();
        }
      });
    });
  }

  // ── Events ────────────────────────────────────────────────────────────────

  _setupEvents() {
    this.events.on('roar', (rx, ry) => {
      this.enemies.getChildren().forEach(e => {
        if (!e._alive) return;
        const dist = Phaser.Math.Distance.Between(rx, ry, e.x, e.y);
        if (dist <= ROAR_RADIUS) {
          if (e instanceof Boulder) {
            e.die();
            this.player.addScore(150);
          } else {
            e.stun(2200);
            this.player.addScore(50);
          }
        }
      });
    });

    this.events.on('stomped', (sx, sy) => {
      this.enemies.getChildren().forEach(e => {
        if (!e._alive) return;
        const dist = Phaser.Math.Distance.Between(sx, sy, e.x, e.y);
        if (dist <= 60) {
          e.die();
          this.player.addScore(120);
        }
      });
    });

    this.events.on('playerDied', () => {
      if (this._levelOver) return;
      this._levelOver = true;
      this.lives--;
      this.time.delayedCall(600, () => {
        if (this.lives <= 0) {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once('camerafadeoutcomplete', () =>
            this.scene.start('GameOverScene', { score: this.totalScore + this.player.score })
          );
        } else {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once('camerafadeoutcomplete', () =>
            this.scene.restart({ level: this.levelIndex, score: this.totalScore, lives: this.lives })
          );
        }
      });
    });

    this.events.on('healthChanged', (hp) => this._updateHealthHUD(hp));
    this.events.on('scoreChanged',  (sc) => this._updateScoreHUD(sc));
  }

  // ── HUD ───────────────────────────────────────────────────────────────────

  _buildHUD() {
    const W = this.scale.width;
    const world = this._world;

    this._hudBg = this.add.graphics().setScrollFactor(0).setDepth(50);
    this._hudBg.fillStyle(0x000000, 0.45);
    this._hudBg.fillRect(0, 0, W, 42);

    // Level info
    this.add.text(W / 2, 6, `WORLD ${this._levelDef.world + 1}  LEVEL ${this.levelIndex + 1}`, {
      fontSize: '12px', color: world.lava ? '#FF8844' : '#aaffaa',
      stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(51);

    // Hearts
    this._hearts = [];
    for (let i = 0; i < 3; i++) {
      const h = this.add.text(10 + i * 24, 8, '♥', {
        fontSize: '18px', color: '#FF4444',
      }).setScrollFactor(0).setDepth(51);
      this._hearts.push(h);
    }

    // Score
    this._scoreTxt = this.add.text(W - 10, 8, `⭐ ${this.totalScore}`, {
      fontSize: '14px', color: '#FFE066', stroke: '#000', strokeThickness: 2,
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(51);

    // Bone counter
    this._boneTxt = this.add.text(W / 2, 22, `🦴 ${this._bonesLeft}`, {
      fontSize: '13px', color: '#F5F5DC', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(51);

    // Roar cooldown indicator
    this._roarBar = this.add.graphics().setScrollFactor(0).setDepth(51);
    this._roarLabel = this.add.text(10, 32, 'ROAR', {
      fontSize: '9px', color: '#FFaa44',
    }).setScrollFactor(0).setDepth(52);
    this._updateRoarBar(0);
  }

  _updateHealthHUD(hp) {
    this._hearts.forEach((h, i) => h.setColor(i < hp ? '#FF4444' : '#444444'));
  }

  _updateScoreHUD(sc) {
    this._scoreTxt.setText(`⭐ ${this.totalScore + sc}`);
  }

  _updateBoneHUD() {
    this._boneTxt.setText(`🦴 ${this._bonesLeft}`);
  }

  _updateRoarBar(cooldownRatio) {
    const barW = 60;
    this._roarBar.clear();
    this._roarBar.fillStyle(0x333333, 0.7);
    this._roarBar.fillRect(28, 33, barW, 7);
    this._roarBar.fillStyle(cooldownRatio > 0 ? 0xFF8800 : 0x44FF44, 0.9);
    this._roarBar.fillRect(28, 33, barW * (1 - cooldownRatio), 7);
  }

  // ── Level complete ────────────────────────────────────────────────────────

  _completeLevel() {
    this._levelOver = true;
    const bonus = this.player.score + this.totalScore;

    this.cameras.main.fadeOut(500, 255, 255, 255);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      const next = this.levelIndex + 1;
      if (next >= LEVELS.length) {
        this.scene.start('WinScene', { score: bonus });
      } else {
        this.scene.start('LevelCompleteScene', {
          level: this.levelIndex,
          nextLevel: next,
          score: bonus,
          lives: this.lives,
        });
      }
    });
  }

  // ── Update loop ───────────────────────────────────────────────────────────

  update(time, delta) {
    if (this._levelOver) return;

    this.touch.update();

    // Merge keyboard into button state
    const btns = { ...this.touch.buttons };
    const kLeft  = this.cursors.left.isDown;
    const kRight = this.cursors.right.isDown;
    const kJump  = this.cursors.up.isDown || this.cursors.space.isDown;
    const kRoar  = this._kRoar.isDown;

    if (kLeft)  btns.left  = true;
    if (kRight) btns.right = true;
    if (kJump && !this._prevKJump) btns.jumpJustPressed = true;
    if (kRoar && !this._kRoarPrev) btns.roarJustPressed = true;
    this._prevKJump  = kJump;
    this._kRoarPrev  = kRoar;

    this.player.update(btns, delta);

    // Enemy updates
    this.enemies.getChildren().forEach(e => e.update(delta));

    // Roar bar
    const roarPct = this.player._roarCooldown / 3000;
    this._updateRoarBar(roarPct);

    // Fall into pit
    if (this.player.y > DEATH_Y && this.player.state !== 'dead') {
      this.player.health = 0;
      this.events.emit('playerDied');
    }
  }
}
