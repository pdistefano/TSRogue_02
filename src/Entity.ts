import { EntityType } from "./EntityType";
import { IVector2 } from "./Vector2";

export class Entity {
	color: string = "rgba(255, 255, 255, 1)";
	inventory: Entity[] = [];
	gold: number = 0;

	constructor(
		public name: string,
		public position: IVector2,
		public char: string,
		public entityType: EntityType,
		color: string = "rgba(255, 255, 255, 1)"
	) {
		this.color = color;
	}
}
