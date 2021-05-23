export class Sound {
  private readonly shootSound: HTMLAudioElement;
  private readonly screamSound: HTMLAudioElement;
  private readonly pointSound: HTMLAudioElement;
  private readonly gameOverSound: HTMLAudioElement;
  private readonly background: HTMLAudioElement;

  constructor(private silent = false) {
    this.background = new Audio('sound/background.mp3');
    this.background.loop = true;
    this.gameOverSound = new Audio('sound/game-over-drop.wav');
    this.shootSound = new Audio('sound/shoot.wav');
    this.screamSound = new Audio('sound/scream.wav');
    this.pointSound = new Audio('sound/point.wav');
  }

  private play(audio: HTMLAudioElement) {
    if (!this.silent) {
      audio.play();
    }
  }

  startBackground() {
    this.play(this.background);
  }

  stopBackground() {
    this.background.pause();
  }

  recharge() {
    const rechargeSound = new Audio('sound/recharge.wav');
    this.play(rechargeSound);
  }

  gameOver() {
    this.play(this.gameOverSound);
  }

  shoot() {
    this.play(this.shootSound);
  }

  point() {
    this.play(this.pointSound);
  }

  scream() {
    this.play(this.screamSound);
  }
}
