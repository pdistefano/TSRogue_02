import { Signal } from "type-signals";
import { IVector2 } from "./Vector2";

export type InputCode = (code: string) => {};
export type InputMovement = (delta: IVector2) => {};

export class InputManager {
  public OnKeyDownSignal: Signal<InputCode>;

  public OnArrowUpSignal: Signal;
  public OnArrowDownSignal: Signal;
  public OnArrowLeftSignal: Signal;
  public OnArrowRightSignal: Signal;
  public OnMoveSignal: Signal<InputMovement>;

  constructor() {
    document.onkeydown = (keyboardEvent: KeyboardEvent) => {
      this._onKeyDown(keyboardEvent);
    };
    this.OnKeyDownSignal = new Signal<InputCode>();

    this.OnArrowUpSignal = new Signal();
    this.OnArrowDownSignal = new Signal();
    this.OnArrowLeftSignal = new Signal();
    this.OnArrowRightSignal = new Signal();

    this.OnMoveSignal = new Signal<InputMovement>();
  }

  private _onKeyDown(keyboardEvent: KeyboardEvent) {
    this.OnKeyDownSignal.dispatch(keyboardEvent.code);

    if (keyboardEvent.code === "KeyW") {
      this.OnMoveSignal.dispatch({ x: 0, y: -1 });
      // this.OnArrowUpSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyE") {
      this.OnMoveSignal.dispatch({ x: 1, y: -1 });
      // this.OnArrowUpSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyQ") {
      this.OnMoveSignal.dispatch({ x: -1, y: -1 });
      // this.OnArrowUpSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyX") {
      this.OnMoveSignal.dispatch({ x: 0, y: +1 });
      // this.OnArrowDownSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyA") {
      this.OnMoveSignal.dispatch({ x: -1, y: 0 });
      // this.OnArrowLeftSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyD") {
      this.OnMoveSignal.dispatch({ x: +1, y: 0 });
      // this.OnArrowRightSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyC") {
      this.OnMoveSignal.dispatch({ x: +1, y: 1 });
      // this.OnArrowRightSignal.dispatch();
    }

    if (keyboardEvent.code === "KeyZ") {
      this.OnMoveSignal.dispatch({ x: -1, y: 1 });
      // this.OnArrowRightSignal.dispatch();
    }
  }
}
