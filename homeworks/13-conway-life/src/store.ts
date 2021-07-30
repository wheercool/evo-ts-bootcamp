import { Game } from './logic/Game';
import { CanvasRenderer } from './logic/CanvasRenderer';
import { Simulator } from './logic/Simulator';
import { createContext } from './storeUtils';
import { Controller } from './logic/Controller';
import { GameInfo } from './logic/GameInfo';


const renderer = new CanvasRenderer();
const simulator = new Simulator();
const game = new Game(renderer, simulator);

export const { StoreProvider, useStore } = createContext({
  Game: game,
  Renderer: renderer,
  Controller: game as Controller,
  GameInfo: game as GameInfo
})
