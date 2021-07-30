import { GameStatus } from '../types';

export interface GameInfo {
  iteration: number;
  totalCells: number;
  gameStatus: GameStatus;
  speed: number;
  rows: number;
  columns: number;
}
