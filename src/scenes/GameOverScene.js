export default class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  init(data) { this.score = data.score ?? 0; }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0000, 0x1a0000, 0x000000, 0x000000, 1);
    bg.fillRect(0, 0, W, H);

    // Flicker effect
    const over = this.add.text(W / 2, H * 0.25, 'GAME OVER', {
      fontSize: '52px', fontStyle: 'bold', color: '#FF2200',
      stroke: '#660000', strokeThickness: 8,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: over, alpha: 0.3, duration: 200,
      yoyo: true, repeat: 4,
    });

    this.add.text(W / 2, H * 0.44, `Final Score: ${this.score}`, {
      fontSize: '28px', fontStyle: 'bold', color: '#FFE066',
      stroke: '#663300', strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.56, 'Rex tried his best...', {
      fontSize: '16px', color: '#ffaaaa',
    }).setOrigin(0.5);

    // Try again
    const btnBg = this.add.graphics();
    const bx = W / 2 - 120, by = H * 0.67;
    btnBg.fillStyle(0xCC2200, 0.9);
    btnBg.fillRoundedRect(bx, by, 240, 54, 12);

    const retry = this.add.text(W / 2, by + 27, '↺  TRY AGAIN', {
      fontSize: '26px', fontStyle: 'bold', color: '#FFFFFF',
      stroke: '#440000', strokeThickness: 4,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    retry.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () =>
        this.scene.start('GameScene', { level: 0, score: 0, lives: 3 })
      );
    });

    // Main menu
    const menu = this.add.text(W / 2, H * 0.83, '⌂  Main Menu', {
      fontSize: '18px', color: '#aaaaff', stroke: '#000033', strokeThickness: 2,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menu.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('MenuScene'));
    });

    this.cameras.main.fadeIn(400);
  }
}
