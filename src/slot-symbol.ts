import * as PIXI from "pixi.js";

export const SYMBOL_WIDTH = 150;
export const SYMBOL_HEIGHT = 150;

export class SlotSymbol extends PIXI.Container {
  public name: string;

  private _row: number = -1; // Logical row index (0=top, 1=center, 2=bottom)
  private _sprite: PIXI.Sprite;
  private _index: number;

  // Debug text
  private _text: PIXI.Text;

  constructor(index: number, name: string, texture: PIXI.Texture) {
    super();
    this._index = index;
    this.name = name;
    this._sprite = new PIXI.Sprite(texture);
    this._sprite.anchor.set(0.5);
    this._sprite.scale.set(0.8);
    this.addChild(this._sprite);

    this._text = new PIXI.Text(name, {
      fontFamily: "Arial",
      fontSize: 14,
      fill: 0x000000,
    });
    this._text.anchor.set(0.5);
    this.addChild(this._text);

    // Set to true if you want to see debug info
    this._text.visible = false;
  }

  get row(): number {
    return this._row;
  }

  setTexture(texture: PIXI.Texture): void {
    this._sprite.texture = texture;
  }

  setRow(row: number): void {
    this._row = row;
    this._text.text = this.name + " " + this.row;
  }
}
