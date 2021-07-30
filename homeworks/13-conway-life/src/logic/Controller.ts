export interface Controller {
  startGame(): void;

  stopGame(): void;

  nextStep(): void;

  increaseSpeed(): void;

  decreaseSpeed(): void;

  toggleCellAt(x: number, y: number): void;

  changeColumns(value: number): void;

  changeRows(value: number): void;

  toggleGrid(): void;

  dispose(): void;
}
