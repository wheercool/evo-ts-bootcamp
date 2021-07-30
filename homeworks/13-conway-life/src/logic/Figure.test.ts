import { createCellsFromFigure } from './Figure';

describe('Figure', () => {
  it('should create empty cells for 0 figure', () => {
    const cells = createCellsFromFigure({ column: 10, row: 10 }, 0);
    expect(cells).toEqual([]);
  })
  it('should create 1 cell for figure=1', () => {
    const cells = createCellsFromFigure({ column: 11, row: 22 },
      0b000_000_000_000_001);
    expect(cells).toEqual([{ column: 13, row: 26 }])
  })
  it('should create 2 cells for first and last cell', () => {
    const cells = createCellsFromFigure({ column: 11, row: 22 },
      0b100_000_000_000_001);
    expect(cells.length).toEqual(2);
    expect(cells).toEqual(expect.arrayContaining([
      { column: 13, row: 26 },
      { column: 11, row: 22 }
    ]));
  })
})
