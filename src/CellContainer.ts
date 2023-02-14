import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { IVector2 } from "./Vector2";
import { CellType } from "./CellType";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import _ from "lodash";

export class CellContainer extends Container implements IVector2 {
  bkgd: Graphics;
  char: Text;
  type: CellType;
  entities: Entity[] = [];

  constructor(
    backgroundColor: number,
    foregroundChar: string,
    position: IVector2,
    size: IVector2,
    cellType: CellType
  ) {
    super();

    this.x = position.x;
    this.y = position.y;

    this.bkgd = new Graphics();
    this.bkgd.beginFill(backgroundColor, 1);
    this.bkgd.drawRect(0, 0, size.x, size.y);
    this.bkgd.endFill();

    this.addChild(this.bkgd);

    const textStyle = new TextStyle({
      fill: "rgba(255, 255, 255, 0.85)",
      align: "center",
      fontFamily: "monospace",
      fontSize: 32
    });

    this.type = cellType;

    this.char = new Text(foregroundChar, textStyle);
    this.addChild(this.char);
    this.update();
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
    this.update();
  }

  removeEntity(entity: Entity): Entity {
    const index: number = this.entities.findIndex((e) => e === entity);
    const removedEntity = this.entities.splice(index, 1)[0];
    this.update();
    return removedEntity;
  }

  update() {
    if (this.entities.length > 0) {
      // const pickups: Entity[] = this.entities.filter(
      //   (e) => e.entityType === EntityType.Pickup
      // );
      const players: Entity[] = this.entities.filter(
        (e) => e.entityType === EntityType.Player
      );

      if (players.length > 0) {
        const pickups: Entity[] = _.remove(
          this.entities,
          (e) => e.entityType === EntityType.Gold
        );
        const player: Entity = players[0];
        player.gold += pickups.length;
        console.log(player.gold);
      }

      const ent = this.entities[this.entities.length - 1];
      this.char.text = ent.char;
      this.char.style.fill = ent.color;
    } else {
      this.char.text = this.type;
      this.char.style.fill = "rgba(255, 255, 255, 1)";
    }
  }
}
