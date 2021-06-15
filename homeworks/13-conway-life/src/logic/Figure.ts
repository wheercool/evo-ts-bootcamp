import { Cells, Figure, Grid } from '../types';

const FIGURE_COLUMNS = 3;
const FIGURE_ROWS = 5;
const MAX_FIGURE_CELLS = FIGURE_ROWS * FIGURE_COLUMNS;
const MAX_FIGURE_CODE = (1 << FIGURE_COLUMNS * FIGURE_ROWS) - 1

export function generateRandomFigure(): number {
  // Figure is encoded with number for group of cells 3x5
  // ;
  const figures = [
    0b000_010_010_010_000,
    0b010_001_111_000_000,
    0b000_110_110_000_000,
    0b010_010_101_010_010
  ];
  if (Math.random() > 0.5) {
    return 0;
  }

  const figureIndex = Math.floor(Math.random() * figures.length);
  return figures[figureIndex];
}

export function generateRandomField(grid: Grid): Cells {
  const result: Cells = [];
  for (let row = 0; row < grid.rows; row += FIGURE_ROWS) {
    for (let column = 0; column < grid.columns; column += FIGURE_COLUMNS) {
      const cells = createCellsFromFigure({column, row}, generateRandomFigure());
      result.push(...cells);
    }
  }
  return result;
}
/***
 * Creates group of cells for figure at @position
 * @param position - top-left coordinate for figure
 * @param figure - code of figure that describes template 3x5
 */
export function createCellsFromFigure(position: {column: number, row: number}, figure: Figure): Cells {
  const result: Cells = [];
  for (let i = 0; i < FIGURE_COLUMNS * FIGURE_ROWS; i++) {
    const isLife = (figure & (1 << (MAX_FIGURE_CELLS - i - 1))) > 0;
    if (isLife) {
     const row = Math.floor(i / FIGURE_COLUMNS);
     const column = i % FIGURE_COLUMNS;
     result.push({
       row: position.row + row,
       column: position.column + column
     })
    }
  }
  return result;
}

