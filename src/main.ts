import * as PIXI from "pixi.js";
import { Foreground } from "./foreground";
import { GameEvent, gameEventBus, GameEventType } from "./game-event-bus";
import { SlotMachine, SlotTexture } from "./slot-machine";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resizeTo: window,
});
document.body.appendChild(app.view);
//@ts-ignore
globalThis.__PIXI_APP__ = app; // For debugging purposes

const loader = PIXI.Loader.shared;
loader
  .add("eggHead", "https://pixijs.com/assets/eggHead.png")
  .add("flowerTop", "https://pixijs.com/assets/flowerTop.png")
  .add("helmlok", "https://pixijs.com/assets/helmlok.png")
  .add("skully", "https://pixijs.com/assets/skully.png");

loader.load((_, resources) => {
  const slotTextures: SlotTexture[] = [
    { name: "eggHead", texture: resources.eggHead!.texture! },
    { name: "flowerTop", texture: resources.flowerTop!.texture! },
    { name: "helmlok", texture: resources.helmlok!.texture! },
    { name: "skully", texture: resources.skully!.texture! },
  ];

  // Create main game container
  const gameContainer = new PIXI.Container();
  gameContainer.name = "game-container";

  // Create slot machine
  const slotMachine = new SlotMachine(app, slotTextures);
  gameContainer.addChild(slotMachine);

  // Create foreground
  const foreground = new Foreground(app, slotMachine);
  gameContainer.addChild(foreground);

  // Add the main game container to the stage
  app.stage.addChild(gameContainer);

  gameEventBus.emit({ type: GameEventType.APP_STARTED });

  // Example event listeners
  gameEventBus.on((event: GameEvent) => {
    if (event.type === GameEventType.SPIN_START) {
      console.log("Spin started");
    } else if (event.type === GameEventType.SPIN_END) {
      console.log("Spin ended");
    } else if (event.type === GameEventType.WIN) {
      console.log(`Win on row ${event.payload.row}`);
    }
  });
});
