const RAPTOR_SPEED = 90;
const PTERO_SPEED  = 70;
const BOULDER_SPEED = 110;

export class Raptor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dir = 1) {
    super(scene, x, y, 'raptor');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8);
    this.body.setSize(28, 32);
    this.body.setOffset(2, 8);
    this.dir = dir;
    this._stunTimer = 0;
    this._alive = true;
    this._walkTimer = 0;
    this._legToggle = false;
    this.setFlipX(dir < 0);
  }

  update(delta) {
    if (!this._alive) return;
    this._stunTimer = Math.max(0, this._stunTimer - delta);
    if (this._stunTimer > 0) {
      this.body.setVelocityX(0);
      this.setTint(0xAAAAAA);
      return;
    }
    this.setTint(0xFFFFFF);
    this.body.setVelocityX(this.dir * RAPTOR_SPEED);
    this.setFlipX(this.dir < 0);

    // Reverse at edges / walls
    if (this.body.blocked.left)  this.dir = 1;
    if (this.body.blocked.right) this.dir = -1;

    // Reverse at platform edges (check tile below foot)
    this._walkTimer += delta;
    if (this._walkTimer > 200) {
      this._walkTimer = 0;
      this._legToggle = !this._legToggle;
    }
  }

  stun(duration = 2000) {
    this._stunTimer = duration;
  }

  die() {
    if (!this._alive) return;
    this._alive = false;
    this.body.enable = false;
    this.scene.tweens.add({
      targets: this,
      y: this.y - 40,
      alpha: 0,
      angle: 180,
      duration: 400,
      onComplete: () => this.destroy(),
    });
  }
}

export class Pterodactyl extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dir = 1) {
    super(scene, x, y, 'pterodactyl');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8);
    this.body.setSize(36, 16);
    this.body.setOffset(4, 6);
    this.body.setAllowGravity(false);
    this.dir = dir;
    this._baseY = y;
    this._time = 0;
    this._stunTimer = 0;
    this._alive = true;
    this.setFlipX(dir < 0);
  }

  update(delta) {
    if (!this._alive) return;
    this._stunTimer = Math.max(0, this._stunTimer - delta);
    this._time += delta;

    if (this._stunTimer > 0) {
      this.body.setVelocity(0, 0);
      this.setTint(0xAAAAAA);
      return;
    }
    this.setTint(0xFFFFFF);
    this.body.setVelocityX(this.dir * PTERO_SPEED);
    this.y = this._baseY + Math.sin(this._time * 0.003) * 25;
    this.body.setVelocityY(0);

    const bounds = this.scene.physics.world.bounds;
    if (this.x <= bounds.x + 10)  this.dir = 1;
    if (this.x >= bounds.right - 10) this.dir = -1;
    this.setFlipX(this.dir < 0);
  }

  stun(duration = 2000) {
    this._stunTimer = duration;
  }

  die() {
    if (!this._alive) return;
    this._alive = false;
    this.body.enable = false;
    this.body.setAllowGravity(true);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      angle: -90,
      duration: 500,
      onComplete: () => this.destroy(),
    });
  }
}

export class Boulder extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boulder');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8);
    this.body.setCircle(16);
    this._alive = true;
  }

  update(delta) {
    if (!this._alive) return;
    this.body.setVelocityX(-BOULDER_SPEED);
    this.angle -= 3;
    // Destroy if it rolls off left edge
    if (this.x < -64) this.destroy();
  }

  die() {
    if (!this._alive) return;
    this._alive = false;
    this.body.enable = false;
    this.scene.tweens.add({
      targets: this,
      scaleX: 2, scaleY: 2,
      alpha: 0,
      duration: 300,
      onComplete: () => this.destroy(),
    });
  }
}
