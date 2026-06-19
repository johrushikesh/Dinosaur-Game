export const PLAYER_W = 32;
export const PLAYER_H = 48;

export const JUMP_VEL    = -580;
export const STOMP_VEL   =  700;
export const RUN_SPEED   =  220;
export const ROAR_RADIUS = 160;
export const ROAR_CD     = 3000;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rex');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(10);
    this.body.setSize(PLAYER_W - 6, PLAYER_H - 4);
    this.body.setOffset(3, 4);

    this.state = 'idle';   // idle | run | jump | stomp | roar | hurt | dead
    this.health    = 3;
    this.score     = 0;
    this.isOnGround = false;
    this.facingRight = true;

    this._roarCooldown = 0;
    this._hurtCooldown = 0;
    this._stompActive  = false;

    // Roar ring visual
    this._roarRing = scene.add.graphics().setDepth(9);

    // Dust particles on stomp/land
    this._dustEmitter = scene.add.particles(0, 0, 'dust', {
      speed: { min: 30, max: 80 },
      angle: { min: 180, max: 360 },
      scale: { start: 0.8, end: 0 },
      lifespan: 300,
      quantity: 6,
      emitting: false,
    }).setDepth(8);
  }

  update(btns, delta) {
    const body = this.body;
    this.isOnGround = body.blocked.down;
    this._roarCooldown  = Math.max(0, this._roarCooldown  - delta);
    this._hurtCooldown  = Math.max(0, this._hurtCooldown  - delta);

    if (this.state === 'dead') return;

    const canAct = this._hurtCooldown <= 0;

    // ── Horizontal movement ──────────────────────────────────────────────────
    if (canAct && btns.left) {
      body.setVelocityX(-RUN_SPEED);
      this.facingRight = false;
    } else if (canAct && btns.right) {
      body.setVelocityX(RUN_SPEED);
      this.facingRight = true;
    } else {
      body.setVelocityX(body.velocity.x * 0.82);
      if (Math.abs(body.velocity.x) < 5) body.setVelocityX(0);
    }

    this.setFlipX(!this.facingRight);

    // ── Stomp – fast slam downward when airborne + jump pressed ─────────────
    if (canAct && !this.isOnGround && btns.jumpJustPressed && !this._stompActive) {
      this._stompActive = true;
      body.setVelocityY(STOMP_VEL);
      this.state = 'stomp';
    }

    // ── Jump ─────────────────────────────────────────────────────────────────
    if (canAct && this.isOnGround && btns.jumpJustPressed) {
      body.setVelocityY(JUMP_VEL);
      this.state = 'jump';
    }

    // ── Stomp landing ────────────────────────────────────────────────────────
    if (this._stompActive && this.isOnGround) {
      this._stompActive = false;
      this._dustEmitter.setPosition(this.x, this.y + PLAYER_H / 2);
      this._dustEmitter.explode(8);
      this.scene.cameras.main.shake(80, 0.008);
      this.scene.events.emit('stomped', this.x, this.y + PLAYER_H / 2);
    }

    // ── Roar ─────────────────────────────────────────────────────────────────
    if (canAct && btns.roarJustPressed && this._roarCooldown <= 0) {
      this._roarCooldown = ROAR_CD;
      this._triggerRoar();
    }

    // ── Animate roar ring ────────────────────────────────────────────────────
    this._animateRoarRing(delta);

    // ── Visual state ─────────────────────────────────────────────────────────
    if (this.isOnGround) {
      this.state = Math.abs(body.velocity.x) > 20 ? 'run' : 'idle';
    } else if (this.state !== 'stomp') {
      this.state = 'jump';
    }

    this._drawPlayer();
  }

  _triggerRoar() {
    this._roarRingRadius = 0;
    this._roarRingActive = true;
    this.scene.cameras.main.shake(120, 0.006);
    this.scene.events.emit('roar', this.x, this.y, ROAR_RADIUS);
  }

  _animateRoarRing(delta) {
    if (!this._roarRingActive) { this._roarRing.clear(); return; }
    this._roarRingRadius = (this._roarRingRadius || 0) + delta * 0.25;
    const r = this._roarRingRadius;
    if (r >= ROAR_RADIUS) { this._roarRingActive = false; this._roarRing.clear(); return; }
    const alpha = 1 - r / ROAR_RADIUS;
    this._roarRing.clear();
    this._roarRing.lineStyle(4, 0xFFFF00, alpha);
    this._roarRing.strokeCircle(this.x, this.y, r);
    this._roarRing.lineStyle(2, 0xFF8800, alpha * 0.6);
    this._roarRing.strokeCircle(this.x, this.y, r * 0.65);
  }

  _drawPlayer() {
    // Texture is static; tint signals state
    if (this._hurtCooldown > 0) {
      const flash = Math.floor(this._hurtCooldown / 80) % 2 === 0;
      this.setAlpha(flash ? 0.4 : 1);
    } else {
      this.setAlpha(1);
    }
    // Tint for stomp
    this.setTint(this._stompActive ? 0xFF6600 : 0xFFFFFF);
  }

  hurt() {
    if (this._hurtCooldown > 0 || this.state === 'dead') return;
    this.health -= 1;
    this._hurtCooldown = 1200;
    this.body.setVelocityY(-280);
    this.scene.events.emit('healthChanged', this.health);
    if (this.health <= 0) this._die();
  }

  addScore(pts) {
    this.score += pts;
    this.scene.events.emit('scoreChanged', this.score);
  }

  _die() {
    this.state = 'dead';
    this.body.setVelocity(0, -300);
    this.setTint(0xFF0000);
    this.scene.time.delayedCall(800, () => this.scene.events.emit('playerDied'));
  }

  destroy() {
    this._roarRing.destroy();
    this._dustEmitter.destroy();
    super.destroy();
  }
}
