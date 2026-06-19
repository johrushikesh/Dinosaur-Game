// Generates all game textures procedurally (no external assets)

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makeTextures();
    this.scene.start('MenuScene');
  }

  _makeTextures() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    // ── Rex (player) ──────────────────────────────────────────────────────────
    // Body
    g.fillStyle(0x2E8B57); g.fillRect(4, 16, 24, 32);
    // Head
    g.fillStyle(0x3CB371); g.fillRect(8, 0, 24, 22);
    // Snout
    g.fillStyle(0x2E8B57); g.fillRect(28, 6, 8, 10);
    // Nostril
    g.fillStyle(0x1A5C38); g.fillRect(32, 8, 3, 3);
    // Eye white
    g.fillStyle(0xFFFFFF); g.fillRect(16, 3, 10, 10);
    // Pupil
    g.fillStyle(0x000000); g.fillRect(20, 6, 5, 5);
    // Highlight
    g.fillStyle(0xFFFFFF); g.fillRect(22, 6, 2, 2);
    // Tail
    g.fillStyle(0x228B22); g.fillRect(0, 20, 8, 16); g.fillRect(0, 34, 5, 8);
    // Arms (tiny)
    g.fillStyle(0x3CB371); g.fillRect(28, 22, 8, 6); g.fillRect(32, 26, 4, 4);
    // Belly
    g.fillStyle(0x90EE90); g.fillRect(8, 24, 16, 20);
    // Legs
    g.fillStyle(0x1A5C38); g.fillRect(8, 44, 10, 10); g.fillRect(20, 44, 10, 10);
    // Toe claws
    g.fillStyle(0xFFFFFF); g.fillRect(8, 52, 3, 3); g.fillRect(20, 52, 3, 3);

    g.generateTexture('rex', 36, 54);
    g.clear();

    // ── Rex jumping (arms raised) ────────────────────────────────────────────
    g.fillStyle(0x2E8B57); g.fillRect(4, 16, 24, 32);
    g.fillStyle(0x3CB371); g.fillRect(8, 0, 24, 22);
    g.fillStyle(0x2E8B57); g.fillRect(28, 6, 8, 10);
    g.fillStyle(0x1A5C38); g.fillRect(32, 8, 3, 3);
    g.fillStyle(0xFFFFFF); g.fillRect(16, 3, 10, 10);
    g.fillStyle(0x000000); g.fillRect(20, 6, 5, 5);
    g.fillStyle(0xFFFFFF); g.fillRect(22, 6, 2, 2);
    g.fillStyle(0x228B22); g.fillRect(0, 20, 8, 16); g.fillRect(0, 34, 5, 8);
    g.fillStyle(0x90EE90); g.fillRect(8, 24, 16, 20);
    // Arms up
    g.fillStyle(0x3CB371); g.fillRect(28, 14, 8, 6); g.fillRect(32, 10, 4, 6);
    // Legs tucked
    g.fillStyle(0x1A5C38); g.fillRect(6, 42, 12, 10); g.fillRect(20, 40, 12, 12);
    g.fillStyle(0xFFFFFF); g.fillRect(6, 50, 3, 3); g.fillRect(20, 50, 3, 3);

    g.generateTexture('rex-jump', 36, 54);
    g.clear();

    // ── Raptor (enemy) ───────────────────────────────────────────────────────
    // Body
    g.fillStyle(0xCC5500); g.fillRect(2, 10, 22, 26);
    // Head
    g.fillStyle(0xDD6611); g.fillRect(18, 2, 16, 16);
    // Jaw
    g.fillStyle(0xCC5500); g.fillRect(28, 12, 8, 6);
    // Teeth
    g.fillStyle(0xFFFFFF); g.fillRect(28, 14, 2, 4); g.fillRect(32, 14, 2, 4);
    // Eye
    g.fillStyle(0xFF0000); g.fillRect(22, 4, 8, 8);
    g.fillStyle(0x000000); g.fillRect(24, 6, 4, 4);
    // Tail
    g.fillStyle(0xAA4400); g.fillRect(0, 14, 6, 14); g.fillRect(0, 26, 4, 6);
    // Belly
    g.fillStyle(0xFFCC88); g.fillRect(6, 16, 12, 16);
    // Legs
    g.fillStyle(0xAA4400); g.fillRect(6, 32, 8, 10); g.fillRect(16, 32, 8, 10);
    // Claws
    g.fillStyle(0x222222); g.fillRect(4, 40, 4, 3); g.fillRect(14, 40, 4, 3);

    g.generateTexture('raptor', 36, 44);
    g.clear();

    // ── Pterodactyl (flying enemy) ───────────────────────────────────────────
    // Body center
    g.fillStyle(0x6633AA); g.fillRect(16, 6, 16, 16);
    // Left wing
    g.fillStyle(0x7744BB); g.fillTriangle(0, 22, 16, 6, 16, 22);
    // Right wing
    g.fillStyle(0x7744BB); g.fillTriangle(32, 22, 48, 4, 48, 22);
    g.fillTriangle(32, 6, 48, 4, 32, 22);
    // Head beak
    g.fillStyle(0x8844CC); g.fillRect(28, 0, 12, 10);
    g.fillStyle(0xFFCC00); g.fillRect(36, 2, 8, 4);
    // Eye
    g.fillStyle(0xFF4444); g.fillRect(30, 2, 6, 6);
    g.fillStyle(0x000000); g.fillRect(31, 3, 3, 3);
    // Wing tips
    g.fillStyle(0x5522AA); g.fillRect(0, 16, 6, 8); g.fillRect(42, 0, 6, 8);

    g.generateTexture('pterodactyl', 48, 28);
    g.clear();

    // ── Boulder ──────────────────────────────────────────────────────────────
    g.fillStyle(0x555555); g.fillCircle(16, 16, 16);
    g.fillStyle(0x777777); g.fillCircle(10, 10, 5);
    g.fillStyle(0x444444); g.fillCircle(20, 20, 4);
    g.fillStyle(0x888888); g.fillRect(6, 18, 4, 2);
    g.lineStyle(2, 0x333333, 1); g.strokeCircle(16, 16, 15);

    g.generateTexture('boulder', 32, 32);
    g.clear();

    // ── Bone collectible ──────────────────────────────────────────────────────
    // Top knob
    g.fillStyle(0xF5F5DC); g.fillCircle(8, 3, 5); g.fillCircle(3, 3, 4);
    // Shaft
    g.fillStyle(0xEEEECC); g.fillRect(4, 2, 8, 20);
    // Bottom knob
    g.fillStyle(0xF5F5DC); g.fillCircle(8, 21, 5); g.fillCircle(3, 21, 4);

    g.generateTexture('bone', 16, 24);
    g.clear();

    // ── Goal flag / portal ────────────────────────────────────────────────────
    // Pole
    g.fillStyle(0xCCCCCC); g.fillRect(4, 0, 6, 64);
    // Flag
    g.fillStyle(0xFFDD00); g.fillTriangle(10, 4, 10, 28, 40, 16);
    g.fillStyle(0xFF8800); g.fillTriangle(10, 6, 10, 26, 36, 16);
    // Star on top
    g.fillStyle(0xFFFFFF); g.fillCircle(7, 4, 5);
    g.fillStyle(0xFFDD00); g.fillCircle(7, 4, 3);

    g.generateTexture('goal-flag', 44, 64);
    g.clear();

    // ── Dust particle ────────────────────────────────────────────────────────
    g.fillStyle(0xCCBB88, 0.8); g.fillCircle(4, 4, 4);
    g.generateTexture('dust', 8, 8);
    g.clear();

    // ── Ground tile (solid) ───────────────────────────────────────────────────
    g.fillStyle(0x2D5A1B); g.fillRect(0, 0, 40, 40);
    g.fillStyle(0x3C7A24, 0.5); g.fillRect(0, 0, 40, 6);
    g.lineStyle(1, 0x1A3A0E, 0.4);
    g.strokeRect(0, 0, 40, 40);
    g.generateTexture('ground-tile', 40, 40);
    g.clear();

    // ── Platform tile ─────────────────────────────────────────────────────────
    g.fillStyle(0x5C3D11); g.fillRect(0, 0, 40, 20);
    g.fillStyle(0x7A5220, 0.6); g.fillRect(0, 0, 40, 5);
    g.fillStyle(0x3D2A0C, 0.4); g.fillRect(0, 15, 40, 5);
    g.generateTexture('platform-tile', 40, 20);
    g.clear();

    g.destroy();
  }
}
