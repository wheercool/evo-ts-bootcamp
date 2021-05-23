export class Sound {
  private shootSound: HTMLAudioElement;
  private screamSound: HTMLAudioElement;
  private pointSound: HTMLAudioElement;
  private gameOverSound: HTMLAudioElement;
  private background: HTMLAudioElement;

  constructor() {
	this.background = new Audio('sound/background.mp3');
	this.background.loop = true;
    this.gameOverSound = new Audio('sound/game-over-drop.wav');
    this.shootSound = new Audio('sound/shoot.wav');
    this.screamSound = new Audio('sound/scream.wav');
    this.pointSound = new Audio('sound/point.wav');
  }

  startBackground() {
	this.background.play();
  }
  stopBackground() {
    this.background.pause();
  }
  recharge() {
    const rechargeSound = new Audio('sound/recharge.wav');
    rechargeSound.play();
  }
  gameOver() {
    this.gameOverSound.play();
  }
  shoot() {
    this.shootSound.play();
  }

  point() {
    this.pointSound.play();
  }

  scream() {
   this.screamSound.play();
  }

}