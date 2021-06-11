export interface Grid {
  columns: number;
  rows: number;
}

export type Cells = Cell[];

export interface Cell {
  column: number,
  row: number
}

export interface GameState {
  grid: Grid;
  cells: Cell[];
}

export enum GameStatus {
  Running = 'Running',
  Stopped = 'Stopped'
}
