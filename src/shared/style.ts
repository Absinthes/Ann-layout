import { StyleValue } from "vue";
import { ComponentStyle } from "~/types";

const couldBeNumberStyle = new Set<keyof ComponentStyle | string>([
  "borderRadius",
  "borderWidth",
  "left",
  "top",
  "width",
  "height",
]);

export function combineStyle(style: Record<string, any>) {
  const res: StyleValue = {};
  Object.keys(style).forEach((it) => {
    if (couldBeNumberStyle.has(it)) {
      // @ts-ignore
      res[it] = style[it] + "px";
      return;
    }
    // @ts-ignore
    res[it] = style[it];
  });
  return res;
}
