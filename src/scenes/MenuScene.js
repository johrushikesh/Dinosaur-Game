export default class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Sky gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a4a8a, 0x1a4a8a, 0x2d8a3e, 0x2d8a3e, 1);
    bg.fillRect(0, 0, W, H);

    // Decorative dino silhouettes
    this._drawSilhouette(80, H - 80, 1.0);
    this._drawSilhouette(W - 100, H - 100, 0.8);

    // Ground strip
    const gr = this.add.graphics();
    gr.fillStyle(0x2D5A1B);
    gr.fillRect(0, H - 60, W, 60);
    gr.fillStyle(0x3C7A24);
    gr.fillRect(0, H - 60, W, 8);

    // Title
    const title = this.add.text(W / 2, H * 0.22, 'REX RUN', {
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#FFE066',
      stroke: '#8B4500',
      strokeThickness: 8,
      shadow: { offsetX: 4, offsetY: 4, color: '#000', blur: 0, fill: true },
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.05, scaleY: 1.05,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Subtitle
    this.add.text(W / 2, H * 0.36, 'A Dinosaur Adventure', {
      fontSize: '20px',
      color: '#aaffaa',
      stroke: '#003300',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // Play button
    const btnBg = this.add.graphics();
    const bx = W / 2 - 100, by = H * 0.52;
    btnBg.fillStyle(0xFF8C00, 0.9);
    btnBg.fillRoundedRect(bx, by, 200, 56, 14);
    btnBg.lineStyle(3, 0xFFDD00);
    btnBg.strokeRoundedRect(bx, by, 200, 56, 14);

    const playTxt = this.add.text(W / 2, by + 28, '▶  PLAY', {
      fontSize: '28px', fontStyle: 'bold', color: '#FFFFFF',
      stroke: '#663300', strokeThickness: 4,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    playTxt.on('pointerover',  () => btnBg.setAlpha(1.2));
    playTxt.on('pointerout',   () => btnBg.setAlpha(1));
    playTxt.on('pointerdown',  () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () =>
        this.scene.start('GameScene', { level: 0, score: 0, lives: 3 })
      );
    });

    // How to play
    const how = [
      '◀ ▶  Move        ▲  Jump',
      'Jump mid-air = STOMP  |  🌊 ROAR = shockwave',
      'Collect bones · 20 Levels · 4 Worlds',
    ];
    how.forEach((line, i) => {
      this.add.text(W / 2, H * 0.71 + i * 24, line, {
        fontSize: '13px', color: '#cceecc',
        stroke: '#002200', strokeThickness: 2,
      }).setOrigin(0.5);
    });

    // Blink
    const tap = this.add.text(W / 2, H * 0.9, 'Tap PLAY to begin', {
      fontSize: '14px', color: '#aaaaff',
    }).setOrigin(0.5);
    this.tweens.add({ targets: tap, alpha: 0.1, duration: 700, yoyo: true, repeat: -1 });

    this.cameras.main.fadeIn(400);
  }

  _drawSilhouette(x, y, scale) {
    const g = this.add.graphics();
    g.fillStyle(0x000000, 0.18);
    // Body
    g.fillRect(x - 30 * scale, y - 60 * scale, 60 * scale, 50 * scale);
    // Head
    g.fillRect(x + 10 * scale, y - 90 * scale, 40 * scale, 35 * scale);
    // Tail
    g.fillRect(x - 60 * scale, y - 50 * scale, 35 * scale, 15 * scale);
    g.fillRect(x - 80 * scale, y - 42 * scale, 22 * scale, 10 * scale);
    // Legs
    g.fillRect(x - 20 * scale, y - 10 * scale, 14 * scale, 30 * scale);
    g.fillRect(x + 12 * scale, y - 10 * scale, 14 * scale, 30 * scale);
  }
}
