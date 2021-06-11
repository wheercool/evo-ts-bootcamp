import { Cell, Cells, GameState, Grid } from '../types';

type Hash = string;

function hashCell(cell: Cell): Hash {
  return `${cell.column}x${cell.row}`;
}

function boundTo(value: number, min: number, max: number) {
  if (value < min) {
    return max + value;
  }
  if (value >= max) {
    return value - max;
  }
  return value;
}

export class Simulator {
  nextState(gameState: GameState): GameState {
    console.time('simulation');
    const nextCells: Cells = [];

    const grid = gameState.grid;

    const visited = new Set<Hash>();
    const candidates: Cells = [];
    gameState.cells.forEach(lifeCell => this.cellWithNeighbours(lifeCell, gameState.grid, visited, candidates));

    for (const cell of candidates) {
      const neighbours = this.totalLifeNeighbours(cell, grid, gameState.cells);
      if (this.isCellLife(cell, gameState.cells)) {
        if ([2, 3].includes(neighbours)) {
          nextCells.push(cell);
        }
      } else {
        if (neighbours === 3) {
          nextCells.push(cell);
        }
      }
    }
    gameState.cells = nextCells;
    console.timeEnd('simulation')
    return gameState;
  }

  totalLifeNeighbours(cell: Cell, grid: Grid, cells: Cell[]): number {
    let result = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }
        const column = boundTo(cell.column + x, 0, grid.columns);
        const row = boundTo(cell.row + y, 0, grid.rows);
        if (this.isCellLife({ column, row }, cells)) {
          result++;
        }
      }
    }
    return result;
  }

  isCellLife(cell: Cell, cells: Cell[]): boolean {
    return cells.some(lifeCell => lifeCell.column === cell.column && lifeCell.row === cell.row);
  }

  private cellWithNeighbours(cell: Cell, grid: Grid, visited: Set<Hash>, candidates: Cells) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const column = boundTo(cell.column + x, 0, grid.columns);
        const row = boundTo(cell.row + y, 0, grid.rows);
        const candidate = { column, row };
        const hash = hashCell(candidate)
        if (!visited.has(hash)) {
          visited.add(hash);
          candidates.push(candidate);
        }
      }
    }
  }
}
