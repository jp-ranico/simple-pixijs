import "reflect-metadata";

import { Container } from "inversify";
import { gameEventBus } from "./game-event-bus";
import { bootstrap } from "./main";
import { GAME_TYPES } from "./types";

/**
 * Root DI container
 */
export const container = new Container({ skipBaseClassChecks: true });

container.bind(GAME_TYPES.GameEventBus).toConstantValue(gameEventBus);

bootstrap(container);
