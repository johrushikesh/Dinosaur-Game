export default class WinScene extends Phaser.Scene {
  constructor() { super('WinScene'); }

  init(data) { this.score = data.score ?? 0; }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x0a1a3a, 0x0a1a3a, 0x001122, 0x001122, 1);
    bg.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const star = this.add.circle(x, y, Math.random() * 2 + 0.5, 0xFFFFFF, Math.random() * 0.9 + 0.1);
      this.tweens.add({ targets: star, alpha: 0.1, duration: 400 + Math.random() * 800, yoyo: true, repeat: -1 });
    }

    // Trophy
    const trophy = this.add.text(W / 2, H * 0.12, '🏆', { fontSize: '64px' }).setOrigin(0.5);
    this.tweens.add({ targets: trophy, y: H * 0.12 - 10, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.add.text(W / 2, H * 0.30, 'YOU WIN!', {
      fontSize: '58px', fontStyle: 'bold', color: '#FFE066',
      stroke: '#664400', strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.42, 'Rex conquered all 4 worlds!', {
      fontSize: '18px', color: '#aaffaa', stroke: '#002200', strokeThickness: 3,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.53, `Final Score: ${this.score}`, {
      fontSize: '30px', fontStyle: 'bold', color: '#FFE066',
      stroke: '#663300', strokeThickness: 5,
    }).setOrigin(0.5);

    // Rank
    let rank = 'D';
    if (this.score >= 5000)  rank = 'C';
    if (this.score >= 10000) rank = 'B';
    if (this.score >= 20000) rank = 'A';
    if (this.score >= 35000) rank = 'S';

    const rankColors = { D: '#aaaaaa', C: '#88ff88', B: '#4488ff', A: '#FFE066', S: '#FF44FF' };
    this.add.text(W / 2, H * 0.63, `Rank: ${rank}`, {
      fontSize: '36px', fontStyle: 'bold', color: rankColors[rank],
      stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);

    // Play again
    const btnBg = this.add.graphics();
    const bx = W / 2 - 120, by = H * 0.76;
    btnBg.fillStyle(0xFF8C00, 0.9);
    btnBg.fillRoundedRect(bx, by, 240, 52, 12);

    const again = this.add.text(W / 2, by + 26, '▶  PLAY AGAIN', {
      fontSize: '24px', fontStyle: 'bold', color: '#FFFFFF',
      stroke: '#663300', strokeThickness: 4,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    again.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () =>
        this.scene.start('GameScene', { level: 0, score: 0, lives: 3 })
      );
    });

    const menu = this.add.text(W / 2, H * 0.89, '⌂  Main Menu', {
      fontSize: '18px', color: '#aaaaff',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menu.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('MenuScene'));
    });

    this.cameras.main.fadeIn(500);
  }
}
