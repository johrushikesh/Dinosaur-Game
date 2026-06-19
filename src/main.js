import Phaser from 'phaser';
import BootScene          from './scenes/BootScene.js';
import MenuScene          from './scenes/MenuScene.js';
import GameScene          from './scenes/GameScene.js';
import LevelCompleteScene from './scenes/LevelCompleteScene.js';
import GameOverScene      from './scenes/GameOverScene.js';
import WinScene           from './scenes/WinScene.js';

const config = {
  type: Phaser.AUTO,
  width:  800,
  height: 540,
  backgroundColor: '#000000',
  parent: document.body,
  scale: {
    mode:             Phaser.Scale.FIT,
    autoCenter:       Phaser.Scale.CENTER_BOTH,
    orientation:      Phaser.Scale.LANDSCAPE,
  },
  physics: {
    default: 'arcade',
    arcade:  { debug: false },
  },
  input: {
    activePointers: 4,  // support multi-touch
  },
  scene: [
    BootScene,
    MenuScene,
    GameScene,
    LevelCompleteScene,
    GameOverScene,
    WinScene,
  ],
};

new Phaser.Game(config);
