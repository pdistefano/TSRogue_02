export function Clamp(value: number, min: number, max: number): number {
  let newVal: number = value;
  if (newVal < min) newVal = min;
  if (newVal > max) newVal = max;
  return newVal;
}
