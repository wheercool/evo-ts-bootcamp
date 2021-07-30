import { Cell, Cells, GameState, Grid } from '../types';
import { ReadyCallback, Renderer } from './Renderer';

export class CanvasRenderer implements Renderer {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private gridWidth = 0;
  private gridHeight = 0;
  private displayGrid = true;
  private cells: Cells = [];
  private grid: Grid = {
    rows: 0,
    columns: 0
  }
  private callbacks: ReadyCallback[] = [];

  cellSize = 0;

  constructor() {
  }

  init(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas is not supported');
    }
    this.ctx = ctx;
    this.canvas = canvas;
    this.updateCanvasSize();
    window.addEventListener('resize', this.onResize);
    this.notifyReadyCallbacks();
  }

  whenReady(callback: ReadyCallback) {
    this.callbacks.push(callback);
    if (this.canvas) {
      this.notifyReadyCallbacks();
    }
  }

  notifyReadyCallbacks() {
    for (const callback of this.callbacks) {
      callback();
    }
  }

  getCell(x: number, y: number): Cell | null {
    if (x > this.gridWidth || y > this.gridHeight) {
      return null;
    }
    const cell: Cell = {
      column: Math.floor(x / this.cellSize),
      row: Math.floor(y / this.cellSize)
    }
    return cell;
  }

  toggleGrid() {
    this.displayGrid = !this.displayGrid;
  }

  render(gameState: GameState) {
    this.cells = gameState.cells;
    const oldColumns = this.grid.columns;
    const oldRows = this.grid.rows;
    this.grid = gameState.grid;

    if (oldColumns !== this.grid.columns || oldRows !== this.grid.rows) {
      this.updateCellSize();
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#b2acac';
    this.ctx.fillRect(0, 0, this.gridWidth, this.gridHeight);
    this.ctx.beginPath();

    if (this.displayGrid) {
      this.renderGrid();
    }
    this.ctx.save();
    this.ctx.fillStyle = '#009688';
    this.renderCells();
    this.ctx.restore();
  }

  dispose() {
    window.removeEventListener('resize', this.onResize);
  }

  private updateCanvasSize() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.updateCellSize();
  }

  private updateCellSize() {
    this.cellSize = Math.min(this.width / this.grid.columns, this.height / this.grid.rows)
    this.gridWidth = this.cellSize * this.grid.columns;
    this.gridHeight = this.cellSize * this.grid.rows;
  }

  private onResize = () => {
    this.updateCanvasSize();
  }

  private renderGrid() {
    for (let i = 0; i < this.grid.columns + 1; i++) {
      const x = i * this.cellSize
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.gridHeight);
    }

    for (let i = 0; i < this.grid.rows + 1; i++) {
      const y = i * this.cellSize
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.gridWidth, y);
    }
    this.ctx.stroke();
  }

  private renderCells() {
    for (const cell of this.cells) {
      this.ctx.fillRect(cell.column * this.cellSize, cell.row * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}
