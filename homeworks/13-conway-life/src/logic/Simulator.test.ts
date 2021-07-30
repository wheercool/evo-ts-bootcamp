import { Cells, Grid } from '../types';
import { cellFromHash, hashCell, Simulator } from './Simulator';

describe('Hash', () => {
  it('should calculate hash', () => {
    const hash = hashCell({ column: 1, row: 2 }, { columns: 3, rows: 3 });
    expect(hash).toEqual(7);
  })
  it('should calculate cell from hash', () => {
    const cell = cellFromHash(7, { columns: 3, rows: 3 });
    expect(cell).toEqual({
      column: 1,
      row: 2
    })
  })
})
describe('Simulator', () => {

  let simulator: Simulator;
  beforeEach(() => {
    simulator = new Simulator();
  })

  function dsl(...rows: string[]): { cells: Cells, grid: Grid } {
    const cells: Cells = [];
    let grid: Grid = {
      rows: rows.length,
      columns: 0
    }
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      grid.columns = Math.max(grid.columns, row.length);
      for (let column = 0; column < row.length; column++) {
        if (row[column] !== ' ') {
          cells.push({
            row: i,
            column
          })
        }
      }
    }
    return {
      cells,
      grid
    };
  }

  it('should build correct dsl', () => {
    const { cells, grid } = dsl(
      `x `,
      `  x`,
      `   `,
      ``
    );
    expect(cells).toEqual([
      {
        column: 0,
        row: 0
      },
      {
        column: 2,
        row: 1
      }]);
    expect(grid).toEqual({
      columns: 3,
      rows: 4
    })
  })
  describe('#isCellLife', () => {
    it('assert true for life cell', () => {
      const { cells, grid } = dsl(
        `x   `,
        `     `,
        `     `
      )
      expect(simulator.isCellLife({ column: 0, row: 0 }, cells)).toEqual(true);
    })
    it('assert false for empty cell', () => {
      const { cells, grid } = dsl(
        `x   `,
        `     `,
        `     `
      )
      expect(simulator.isCellLife({ column: 0, row: 1 }, cells)).toEqual(false);
    })
  })
  describe('#totalNeighbours', () => {
    it('assert 8 neightbours', () => {
      const { cells, grid } = dsl(
        `xxx`,
        `xxx`,
        `xxx`
      )
      expect(simulator.totalLifeNeighbours({ column: 1, row: 1 }, grid, cells)).toEqual(8);
    })

    it('assert 0 neightbours', () => {
      const { cells, grid } = dsl(
        `  `,
        ` x `,
        ` `
      )
      expect(simulator.totalLifeNeighbours({ column: 1, row: 1 }, grid, cells)).toEqual(0);
    })

    it('assert neighbour for top cell', () => {
      const { cells, grid } = dsl(
        ` x  `,
        `   `,
        ` x `
      )
      expect(simulator.totalLifeNeighbours({ column: 1, row: 0 }, grid, cells)).toEqual(1);
    })

    it('assert neighbour for bottom cell', () => {
      const { cells, grid } = dsl(
        ` x  `,
        `   `,
        ` x `
      )
      expect(simulator.totalLifeNeighbours({ column: 1, row: 2 }, grid, cells)).toEqual(1);
    })

    it('assert neighbour for left cell', () => {
      const { cells, grid } = dsl(
        `   `,
        `x   x`,
        `   `
      )
      expect(simulator.totalLifeNeighbours({ column: 0, row: 1 }, grid, cells)).toEqual(1);
    })

    it('assert neighbour for left cell', () => {
      const { cells, grid } = dsl(
        `   `,
        `x   x`,
        `  `
      )
      expect(simulator.totalLifeNeighbours({ column: 4, row: 1 }, grid, cells)).toEqual(1);
    })
  })
})
