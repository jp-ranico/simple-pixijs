import { SlotSymbol } from "./slot-symbol";

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
      readonly payload: { readonly row: number; readonly symbols: SlotSymbol[] };
    };

export type GameEventHandler = (event: GameEvent) => void;

class GameEventBus {
  private handlers: GameEventHandler[] = [];

  public on(handler: GameEventHandler): void {
    this.handlers.push(handler);
  }

  public off(handler: GameEventHandler): void {
    const idx = this.handlers.indexOf(handler);
    if (idx !== -1) this.handlers.splice(idx, 1);
  }

  public emit(event: GameEvent): void {
    for (const handler of this.handlers) {
      handler(event);
    }
  }
}

export const gameEventBus = new GameEventBus();
