import * as PIXI from "pixi.js";
import { SlotMachine } from "./slot-machine";

export class Foreground extends PIXI.Container {
  public playText: PIXI.Text;
  public headerText: PIXI.Text;

  constructor(app: PIXI.Application, slotMachine: SlotMachine) {
    super();
    const margin = Math.round(
      (app.screen.height - 150 * 3) / 2 // fallback for symbol height/visible
    );

    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: 0xffffff,
      stroke: "red",
      strokeThickness: 2,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.playText = new PIXI.Text("SPIN", style);
    this.playText.x = Math.round((app.screen.width - this.playText.width) / 2);
    this.playText.y =
      app.screen.height -
      margin +
      Math.round((margin - this.playText.height) / 2);
    this.playText.interactive = true;
    this.playText.buttonMode = true;
    this.playText.on("pointerdown", () => slotMachine.spin());

    this.headerText = new PIXI.Text("SAMPLE SLOTS", style);
    this.headerText.x = Math.round(
      (app.screen.width - this.headerText.width) / 2
    );
    this.headerText.y = Math.round((margin - this.headerText.height) / 2);

    this.addChild(this.headerText);
    this.addChild(this.playText);
  }
}
