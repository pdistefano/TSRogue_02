import { Random } from "random";

export class RandomUtils 
{
	static Instance: RandomUtils;
	private _random : Random;
	private constructor (seed : number = 0) {
		this._random = new Random();
		this._random.use(seed);

	}

	public static GetInstance() : RandomUtils
	{ 
		if (!RandomUtils.Instance)
		{
			RandomUtils.Instance = new RandomUtils();
		}
		return RandomUtils.Instance;
	}

	public Next() : number
	{ 
		return this._random.next();
	}

}