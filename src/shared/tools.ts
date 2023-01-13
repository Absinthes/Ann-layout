import { ComponentStyle } from "~/types";

export function swapArray(
  arr: any[],
  originIndex: number,
  targetIndex: number
) {
  const help = arr[originIndex];
  arr[originIndex] = arr[targetIndex];
  arr[targetIndex] = help;
}

export function getComponentGeometricInfo(style: ComponentStyle) {
  const { left, top, width, height, rotate } = style;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    rotate
  };
}
