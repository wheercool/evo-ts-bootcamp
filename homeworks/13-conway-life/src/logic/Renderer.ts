import { Cell, GameState } from '../types';

export interface Renderer {
  init(canvas: HTMLCanvasElement): void;

  render(gameState: GameState): void;

  whenReady(callback: ReadyCallback): void;

  getCell(x: number, y: number): Cell | null;

  toggleGrid(): void;

  dispose(): void;
}

export interface ReadyCallback {
  (): void;
}
