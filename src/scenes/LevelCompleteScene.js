import { LEVELS, WORLDS } from '../levels/levelData.js';

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() { super('LevelCompleteScene'); }

  init(data) {
    this.levelIndex = data.level;
    this.nextLevel  = data.nextLevel;
    this.score      = data.score;
    this.lives      = data.lives;
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;
    const nextWorld = WORLDS[LEVELS[this.nextLevel].world];
    const thisWorld = WORLDS[LEVELS[this.levelIndex].world];

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x003300, 0x003300, 0x001100, 0x001100, 1);
    bg.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * W, y = Math.random() * H * 0.6;
      this.add.circle(x, y, 1.5, 0xFFFFFF, Math.random() * 0.8 + 0.2);
    }

    this.add.text(W / 2, H * 0.18, '✓ LEVEL COMPLETE!', {
      fontSize: '38px', fontStyle: 'bold', color: '#FFE066',
      stroke: '#664400', strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.34, `World ${LEVELS[this.levelIndex].world + 1} · Level ${this.levelIndex + 1}`, {
      fontSize: '18px', color: '#aaffaa', stroke: '#002200', strokeThickness: 3,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.48, `Score: ${this.score}`, {
      fontSize: '26px', fontStyle: 'bold', color: '#FFE066',
      stroke: '#663300', strokeThickness: 4,
    }).setOrigin(0.5);

    // Next world hint (if world changes)
    const worldChanging = LEVELS[this.levelIndex].world !== LEVELS[this.nextLevel].world;
    if (worldChanging) {
      this.add.text(W / 2, H * 0.61, `Next: ${nextWorld.name} World!`, {
        fontSize: '20px', color: '#88EEFF', stroke: '#001133', strokeThickness: 3,
      }).setOrigin(0.5);
    } else {
      this.add.text(W / 2, H * 0.61, `Next: Level ${this.nextLevel + 1}`, {
        fontSize: '20px', color: '#88EEFF',
      }).setOrigin(0.5);
    }

    // Continue button
    const btnBg = this.add.graphics();
    const bx = W / 2 - 110, by = H * 0.74;
    btnBg.fillStyle(0xFF8C00, 0.9);
    btnBg.fillRoundedRect(bx, by, 220, 54, 12);

    const cont = this.add.text(W / 2, by + 27, '▶  CONTINUE', {
      fontSize: '26px', fontStyle: 'bold', color: '#FFFFFF',
      stroke: '#663300', strokeThickness: 4,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    cont.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () =>
        this.scene.start('GameScene', {
          level: this.nextLevel,
          score: this.score,
          lives:  this.lives,
        })
      );
    });

    this.cameras.main.fadeIn(400);
  }
}
