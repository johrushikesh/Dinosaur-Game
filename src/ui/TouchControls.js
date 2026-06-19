// On-screen touch buttons rendered in a fixed UI scene

const BTN_SIZE = 72;
const BTN_GAP  = 10;
const BTN_ALPHA = 0.55;

export default class TouchControls {
  constructor(scene) {
    this.scene = scene;

    this.buttons = {
      left: false, right: false,
      jump: false, jumpJustPressed: false,
      roar: false, roarJustPressed: false,
    };

    this._prevJump = false;
    this._prevRoar = false;
    this._activePointers = new Map(); // pointerId -> button name

    const W = scene.scale.width;
    const H = scene.scale.height;
    const pad = 20;

    // Left cluster (bottom-left corner)
    const lx = pad;
    const by = H - pad - BTN_SIZE;

    this._btnLeft  = this._makeBtn(scene, lx,                     by, '◀', 0x334466);
    this._btnRight = this._makeBtn(scene, lx + BTN_SIZE + BTN_GAP, by, '▶', 0x334466);

    // Right cluster (bottom-right corner)
    const rx = W - pad - BTN_SIZE * 2 - BTN_GAP;
    this._btnRoar  = this._makeBtn(scene, rx,                     by, '🌊', 0x663333);
    this._btnJump  = this._makeBtn(scene, rx + BTN_SIZE + BTN_GAP, by, '▲', 0x336633);

    // Labels
    this._addLabel(scene, rx + BTN_SIZE / 2,              by - 14, 'ROAR');
    this._addLabel(scene, rx + BTN_SIZE * 1.5 + BTN_GAP, by - 14, 'JUMP');
    this._addLabel(scene, lx + BTN_SIZE / 2,              by - 14, 'LEFT');
    this._addLabel(scene, lx + BTN_SIZE * 1.5 + BTN_GAP, by - 14, 'RIGHT');

    this._setupPointerEvents();
  }

  _makeBtn(scene, x, y, label, color) {
    const g = scene.add.graphics().setScrollFactor(0).setDepth(100);
    g.fillStyle(color, BTN_ALPHA);
    g.fillRoundedRect(x, y, BTN_SIZE, BTN_SIZE, 12);
    g.lineStyle(2, 0xFFFFFF, 0.3);
    g.strokeRoundedRect(x, y, BTN_SIZE, BTN_SIZE, 12);

    const text = scene.add.text(x + BTN_SIZE / 2, y + BTN_SIZE / 2, label, {
      fontSize: '26px', color: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);

    return { g, text, x, y, w: BTN_SIZE, h: BTN_SIZE, pressed: false };
  }

  _addLabel(scene, x, y, txt) {
    scene.add.text(x, y, txt, {
      fontSize: '10px', color: '#aaccff', alpha: 0.8,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
  }

  _hitTest(btn, px, py) {
    return px >= btn.x && px <= btn.x + btn.w &&
           py >= btn.y && py <= btn.y + btn.h;
  }

  _whichBtn(px, py) {
    if (this._hitTest(this._btnLeft,  px, py)) return 'left';
    if (this._hitTest(this._btnRight, px, py)) return 'right';
    if (this._hitTest(this._btnJump,  px, py)) return 'jump';
    if (this._hitTest(this._btnRoar,  px, py)) return 'roar';
    return null;
  }

  _setPressed(btn, on) {
    btn.pressed = on;
    btn.g.setAlpha(on ? 1 : 1);
    btn.text.setColor(on ? '#ffff00' : '#ffffff');
  }

  _setupPointerEvents() {
    const scene = this.scene;
    const input = scene.input;

    input.on('pointerdown', (ptr) => {
      const name = this._whichBtn(ptr.x, ptr.y);
      if (!name) return;
      this._activePointers.set(ptr.id, name);
      this._applyPress(name, true);
    });

    input.on('pointermove', (ptr) => {
      const prev = this._activePointers.get(ptr.id);
      const curr = this._whichBtn(ptr.x, ptr.y);
      if (prev !== curr) {
        if (prev) this._applyPress(prev, false);
        if (curr) {
          this._activePointers.set(ptr.id, curr);
          this._applyPress(curr, true);
        } else {
          this._activePointers.delete(ptr.id);
        }
      }
    });

    input.on('pointerup', (ptr) => {
      const name = this._activePointers.get(ptr.id);
      if (name) this._applyPress(name, false);
      this._activePointers.delete(ptr.id);
    });

    input.on('pointerupoutside', (ptr) => {
      const name = this._activePointers.get(ptr.id);
      if (name) this._applyPress(name, false);
      this._activePointers.delete(ptr.id);
    });
  }

  _applyPress(name, on) {
    const map = {
      left:  this._btnLeft,
      right: this._btnRight,
      jump:  this._btnJump,
      roar:  this._btnRoar,
    };
    if (map[name]) this._setPressed(map[name], on);
    this.buttons[name] = on;
  }

  update() {
    // Compute "justPressed" from edge detection
    const jumpNow = this.buttons.jump;
    const roarNow = this.buttons.roar;
    this.buttons.jumpJustPressed = jumpNow && !this._prevJump;
    this.buttons.roarJustPressed = roarNow && !this._prevRoar;
    this._prevJump = jumpNow;
    this._prevRoar = roarNow;
  }

  destroy() {
    [this._btnLeft, this._btnRight, this._btnJump, this._btnRoar].forEach(b => {
      b.g.destroy();
      b.text.destroy();
    });
  }
}
