import { TextStyle, Text } from "pixi.js";
import { GameManager } from "./GameManager";
import { MapManager } from "./MapManager";
import { CellType } from "./CellType";
import { IVector2 } from "./Vector2";
import { CellManager } from "./CellManager";
import { InputManager } from "./InputManager";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { RandomUtils } from "./RandomUtils";


GameManager.Application();


let goldTxt: Text;
let playerEntity: Entity;

const Init = () => { 
	const textStyle = new TextStyle({
		fill: "rgba(255, 255, 255, 0.85)",
		align: "center",
		fontFamily: "monospace",
		fontSize: 32
	});
 
	goldTxt = new Text("Gold: 0", textStyle);
	goldTxt.x = 320;
	app.stage.addChild(goldTxt);

	playerEntity = new Entity(
		"player",
		{ x: 1, y: 1 },
		"@",
		EntityType.Player
	);
	

	CellManager.GetCellAtCoordinate(playerEntity.position).addEntity(playerEntity);
}



CellManager.Initialize(MapManager.BuildMap(), 10, 10);



const Update = () => {
	goldTxt.text = `Gold: ${playerEntity.gold}`;

	const oldCell = CellManager.GetCellAtCoordinate(playerEntity.position);
	oldCell.addEntity(oldCell.removeEntity(playerEntity));
}


for (let i = 0; i < 9; i++) {
	let goldPiece: Entity = new Entity(
		"gold",
		{ x: Math.ceil(RandomUtils.GetInstance().Next() * 8), y: Math.ceil(RandomUtils.GetInstance().Next() * 8) },
		"g",
		EntityType.Gold,
		`rgba(255, 255, 0, 1)`
	);
	CellManager.GetCellAtCoordinate(goldPiece.position).addEntity(goldPiece);
}

for (let i = 0; i < 9; i++) {
	let stairs: Entity = new Entity(
		"gold",
		{ x: Math.ceil(RandomUtils.GetInstance().Next() * 8), y: Math.ceil(RandomUtils.GetInstance().Next() * 8) },
		"=",
		EntityType.Stairs,
		`rgba(255, 0, 128, 0.9)`
	);
	CellManager.GetCellAtCoordinate(stairs.position).addEntity(stairs);
}



const inputManager = new InputManager();

inputManager.OnMoveSignal.add((delta: IVector2) => {
	const oldCell = CellManager.GetCellAtCoordinate(playerEntity.position);
	const newCell = CellManager.GetCellAtCoordinate({
		x: playerEntity.position.x + delta.x,
		y: playerEntity.position.y + delta.y
	});
	if (newCell.type === CellType.Wall) {
		return;
	}
	playerEntity.position = CellManager.ConvertDisplayToCoordinate(newCell);
	newCell.addEntity(oldCell.removeEntity(playerEntity));

	Update();
});

inputManager.OnKeyDownSignal.add((code: string) => {
	
	switch (code) {
		case "Numpad8": 
		case "KeyW": 
			playerEntity.char = "⬆";
			break;

		case "Numpad9": 
		case "KeyE": 
			playerEntity.char = "↗";
			break;

		case "Numpad7": 
		case "KeyQ": 
			playerEntity.char = "↖";
			break;

		case "Numpad5": 
			playerEntity.char = "@";
			break;

		case "Numpad4": 
		case "KeyA": 
		playerEntity.char = "⬅";
		break;
		
		case "Numpad6": 
		case "KeyD": 
		playerEntity.char = "➡";
		break;
		
		case "Numpad2": 
		case "KeyX": 
		playerEntity.char = "⬇";
		break;
		
		case "Numpad3": 
		case "KeyC": 
		playerEntity.char = "↘";
		break;
		
		case "Numpad1": 
		case "KeyZ": 
			playerEntity.char = "↙";
			break;
		
	}

	

	Update();
});


Init();