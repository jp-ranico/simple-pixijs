import { Container } from "inversify";
import { SlotSymbol } from "src/slot-symbol";

export const GAME_TYPES = {
  SlotTextures: Symbol.for("SlotTextures"),
  PixiApp: Symbol.for("PixiApp"),
  GameEventBus: Symbol.for("GameEventBus"),
  SlotMachine: Symbol.for("SlotMachine"),
  Foreground: Symbol.for("Foreground"),
};

export interface SetupParams {
  container: Container;
  app: PIXI.Application;
  resources: Partial<Record<string, PIXI.LoaderResource>>;
}

export const enum GameEventType {
  APP_STARTED = "APP_STARTED",
  SPIN_START = "SPIN_START",
  SPIN_END = "SPIN_END",
  WIN = "WIN",
}

export type GameEvent =
  | { readonly type: GameEventType.APP_STARTED }
  | { readonly type: GameEventType.SPIN_START }
  | { readonly type: GameEventType.SPIN_END }
  | {
      readonly type: GameEventType.WIN;
      readonly payload: {
        readonly row: number;
        readonly symbols: SlotSymbol[];
      };
    };

export type GameEventHandler = (event: GameEvent) => void;

export interface GameEventBus {
  on(handler: GameEventHandler): void;
  off(handler: GameEventHandler): void;
  emit(event: GameEvent): void;
}
