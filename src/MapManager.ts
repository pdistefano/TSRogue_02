import {CellContainer} from "./CellContainer";
import {CellType} from "./CellType";
import { GameManager } from "./GameManager";
import {RandomUtils} from "./RandomUtils";
import { Application } from "pixi.js";

export class MapManager 
{
	public static BuildMap(): CellContainer[]
	{
		const AddChild: Function = GameManager.Application().stage.addChild;
		const cellArray: CellContainer[] = [];
		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				const cellType =
					x === 0 || x === 9 || y === 0 || y === 9
						? CellType.Wall
						: CellType.Room;
		
				let newCell: CellContainer = new CellContainer(
					RandomUtils.GetInstance().Next() * 0x000050,
					cellType,
					{ x: x * 32, y: y * 32 },
					{ x: 32, y: 32 },
					cellType
				);
				cellArray.push(newCell);
				AddChild(newCell);
			}
		}
		return cellArray;
	}
}