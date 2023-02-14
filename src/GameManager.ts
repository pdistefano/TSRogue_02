import { Application } from "pixi.js";

export class GameManager
{
	private static _application : Application;

	public static Application() : Application
	{
		if (!GameManager._application)
		{
			GameManager._application = new Application({
				view: document.getElementById("app") as HTMLCanvasElement,
				resolution: window.devicePixelRatio || 1,
				autoDensity: true,
				backgroundColor: 0x0c1323,
				width: 576,
				height: 320
			}); 

		}
		return GameManager._application;
	}

}