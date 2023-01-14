import { ComponentStyle } from "~/types";
import { angleToRadian } from "./calculate";

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
  let { left, top, width, height, rotate } = style;

  if (rotate !== 0) {
    const r = angleToRadian(rotate);

    const newWidth = width * Math.cos(r) + height * Math.sin(r);
    const diffX = (width - newWidth) / 2;
    left += diffX;

    const newHeight = height * Math.cos(r) + width * Math.sin(r);
    const diffY = (newHeight - height) / 2;
    top -= diffY;

    width = newWidth;
    height = newHeight;
  }

  // console.log({
  //   left,
  //   top,
  //   right: left + width,
  //   bottom: top + height,
  //   width,
  //   height,
  //   rotate,
  // });
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    rotate,
  };
}

export type ComponentGeometricInfoReturnType = ReturnType<
  typeof getComponentGeometricInfo
>;
