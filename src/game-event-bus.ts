import { GameEvent, GameEventBus, GameEventHandler } from "./types";

class GameEventBusImpl implements GameEventBus {
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

export const gameEventBus = new GameEventBusImpl();
