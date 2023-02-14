import { CellContainer } from "./CellContainer";
import { IVector2 } from "./Vector2";
import * as MathUtils from "./MathUtils";

export class CellManager {
  private static _cellContainerList: CellContainer[] = [];
  private static _width: number = 0;
  private static _height: number = 0;
  private static _cellSize: number = 32;

  public static Initialize (cellContainerList: CellContainer[], width: number, height: number): void {
    CellManager._cellContainerList = cellContainerList;
    CellManager._width = width;
    CellManager._height = height;
  }

  public static ConvertCoordinateToIndex(coord: IVector2): number {
    // console.assert(coord.x >= 0 && coord.x < CellManager._width);
    // console.assert(coord.y >= 0 && coord.y < CellManager._height);

    const x: number = MathUtils.Clamp(coord.x, 0, CellManager._width - 1);
    const y: number = MathUtils.Clamp(coord.y, 0, CellManager._height - 1);

    return MathUtils.Clamp(
      y * CellManager._width + x,
      0,
      CellManager._cellContainerList.length - 1
    );
  }

  public static ConvertIndexToCoordinate(index: number): IVector2 {
    console.assert(index >= 0 && index < CellManager._cellContainerList.length);
    return {
      x: MathUtils.Clamp(index % CellManager._width, 0, CellManager._width - 1), // x
      y: MathUtils.Clamp(
        Math.floor(index / CellManager._height),
        0,
        CellManager._height - 1
      ) // y
    };
  }

  public static GetCellAtIndex(index: number): CellContainer {
    return CellManager._cellContainerList[index];
  }

  public static GetCellAtCoordinate(coord: IVector2): CellContainer {
    return CellManager._cellContainerList[
      CellManager.ConvertCoordinateToIndex(coord)
    ];
  }

  public static ConvertCoordinateToDisplay(coord: IVector2): IVector2 {
    return {
      x: coord.x * CellManager._cellSize,
      y: coord.y * CellManager._cellSize
    };
  }

  public static ConvertDisplayToCoordinate(coord: IVector2): IVector2 {
    return {
      x: coord.x / CellManager._cellSize,
      y: coord.y / CellManager._cellSize
    };
  }
}
