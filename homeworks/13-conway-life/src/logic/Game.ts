import { Renderer } from './Renderer';
import { Simulator } from './Simulator';
import { GameState, GameStatus } from '../types';
import { Controller } from './Controller';
import { GameInfo } from './GameInfo';
import { action, computed, makeObservable, observable, toJS } from 'mobx';

const ONE_SECOND = 1000;

export class Game implements Controller, GameInfo {
  private rafHandle: number = -1;
  private autoPlayHandle: number = -1;
  private readonly SPEED_STEP = 5;

  @observable private state: GameState = {
    cells: [],
    grid: {
      columns: 40,
      rows: 20
    }
  }
  @observable gameStatus: GameStatus = GameStatus.Stopped;
  @observable iteration: number = 0;
  @observable speed = 5;

  @computed get totalCells(): number {
    return this.state.cells.length;
  }

  @computed get columns(): number {
    return this.state.grid.columns;
  }

  @computed get rows(): number {
    return this.state.grid.rows;
  }

  constructor(
    private renderer: Renderer,
    private simulator: Simulator
  ) {
    makeObservable(this);
    renderer.whenReady(this.update);
  }

  @action.bound startGame() {
    this.gameStatus = GameStatus.Running;
    this.autoPlay();
  }

  @action.bound stopGame() {
    this.gameStatus = GameStatus.Stopped;
    this.cancelAutoPlay();
  }

  @action.bound nextStep() {
    this.iteration++;
    this.state = this.simulator.nextState(this.state);
  }

  @action.bound changeColumns(value: number) {
    this.state.grid.columns = value;
    this.correctState();
  }

  @action.bound changeRows(value: number) {
    this.state.grid.rows = value;
    this.correctState();
  }

  @action.bound increaseSpeed(): void {
    if (this.speed === 1) {
      this.speed = this.SPEED_STEP;
    } else {
      this.speed += this.SPEED_STEP;
    }
  }

  @action.bound decreaseSpeed(): void {
    this.speed -= this.SPEED_STEP;
    if (this.speed <= 0) {
      this.speed = 1;
    }
  }

  @action.bound toggleCellAt(x: number, y: number): void {
    const cell = this.renderer.getCell(x, y);
    if (cell) {
      if (this.simulator.isCellLife(cell, this.state.cells)) {
        const idx = this.state.cells.findIndex(lifeCell => lifeCell.column === cell.column && lifeCell.row === cell.row);
        if (idx !== -1) {
          this.state.cells.splice(idx, 1);
        }
      } else {
        this.state.cells.push(cell)
      }
    }
  }

  @action.bound toggleGrid() {
    this.renderer.toggleGrid();
  }

  dispose() {
    this.cancelAnimation();
    this.cancelAutoPlay();
    this.renderer.dispose();
  }

  @action.bound
  private update() {
    this.renderer.render(toJS(this.state));
    this.rafHandle = requestAnimationFrame(() => this.update());
  }


  private cancelAutoPlay() {
    if (this.autoPlayHandle) {
      clearTimeout(this.autoPlayHandle);
    }
  }

  private cancelAnimation() {
    if (this.rafHandle) {
      cancelAnimationFrame(this.rafHandle);
    }
  }

  private autoPlay() {
    this.nextStep();
    this.autoPlayHandle = window.setTimeout(() => this.autoPlay(), ONE_SECOND / this.speed);
  }

  private correctState() {
    const grid = this.state.grid;
    this.state.cells = this.state.cells.filter(lifeCell => lifeCell.row < grid.rows && lifeCell.column < grid.columns);
  }
}
