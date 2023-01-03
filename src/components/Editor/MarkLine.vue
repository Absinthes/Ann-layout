<template>
  <div h-full>
    <div
      v-for="(line, key) in lineState"
      v-show="line.isShow"
      absolute
      :class="key.includes('x') ? 'x-line' : 'y-line'"
      :style="getMarkLineStyle(line)"
      bg-blue-2
    ></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { StyleValue } from "vue";
import { emitter, getComponentGeometricInfo } from "~/shared";
import { useLowCodeStore } from "~/store";

type Line = "xt" | "xc" | "xb" | "yl" | "yc" | "yr";
type TopLine = "xt" | "xc" | "xb";
type LeftLine = Exclude<Line, TopLine>;
type Position = "top" | "left";
type LineState = {
  isShow: boolean;
  style: {
    left: number;
    top: number;
  };
};

type Condition = {
  [k in Position]: ConditionItem<k extends "top" ? TopLine : LeftLine>[];
};

type ConditionItem<T = TopLine | LeftLine> = {
  line: T;
  isNearly: boolean;
  lineValue: number;
  curValue: number;
};

const lowCodeStore = useLowCodeStore();
const { currentComponent, localCanvasData } = storeToRefs(lowCodeStore);
const lines: Line[] = ["xt", "xc", "xb", "yl", "yc", "yr"];
const diff = 10;
const lineState = ref<Record<Line, LineState>>(initLineState());

function initLineState() {
  // @ts-ignore
  const re: Record<Line, LineState> = {};
  lines.forEach((it) => {
    re[it] = {
      isShow: false,
      style: {
        left: 0,
        top: 0,
      },
    };
  });
  return re;
}

emitter.on("move", () => {
  showLine();
});

emitter.on("unMove", () => {
  hideLine();
});

function showLine() {
  const {
    left: curLeft,
    right: curRight,
    top: curTop,
    bottom: curBottom,
    width: curWidth,
    height: curHeight,
  } = getComponentGeometricInfo(currentComponent.value!.style);

  const curHalfWidth = curWidth / 2;
  const curHalfHeight = curHeight / 2;
  hideLine();

  const needShowLine: Line[] = [];
  localCanvasData.value.forEach((component) => {
    if (component.id == currentComponent.value?.id) return;
    const { left, right, top, bottom, width, height } =
      getComponentGeometricInfo(component.style);

    const conditions: Condition = {
      top: [
        {
          line: "xt",
          isNearly: isNearly(top, curTop) || isNearly(top, curBottom),
          lineValue: top,
          curValue: isNearly(top, curBottom) ? top - curHeight : top,
        },
        {
          line: "xc",
          isNearly:
            isNearly(top + height / 2, curTop) ||
            isNearly(top + height / 2, curBottom) ||
            isNearly(top + height / 2, curTop + curHeight / 2),
          lineValue: top + height / 2,
          curValue: isNearly(top + height / 2, curTop + curHeight / 2)
            ? top + height / 2 - curHalfHeight
            : isNearly(top + height / 2, curTop)
            ? top + height / 2
            : top + height / 2 - curHeight,
        },
        {
          line: "xb",
          isNearly: isNearly(bottom, curTop) || isNearly(bottom, curBottom),
          lineValue: bottom,
          curValue: isNearly(bottom, curTop) ? bottom : bottom - curHeight,
        },
      ],
      left: [
        {
          line: "yl",
          isNearly: isNearly(left, curLeft) || isNearly(left, curRight),
          lineValue: left,
          curValue: isNearly(left, curLeft) ? left : left - curWidth,
        },
        {
          line: "yc",
          isNearly:
            isNearly(left + width / 2, curLeft) ||
            isNearly(left + width / 2, curRight) ||
            isNearly(left + width / 2, curLeft + curWidth / 2),
          lineValue: left + width / 2,
          curValue: isNearly(left + width / 2, curLeft + curWidth / 2)
            ? left + width / 2 - curHalfWidth
            : isNearly(left + width / 2, curLeft)
            ? left + width / 2
            : left + width / 2 - curWidth,
        },
        {
          line: "yr",
          isNearly: isNearly(right, curRight) || isNearly(right, curLeft),
          lineValue: right,
          curValue: isNearly(right, curLeft) ? right : right - curWidth,
        },
      ],
    };

    Object.keys(conditions).forEach((key) => {
      conditions[key as Position].forEach((condition) => {
        if (condition.isNearly) {
          needShowLine.push(condition.line);
          lineState.value[condition.line].style[key as Position] =
            condition.lineValue;

          currentComponent.value?.id &&
            lowCodeStore.setComponentStyle(currentComponent.value.id, {
              [key]: condition.curValue,
            });
        }
      });
    });
  });
  needShowLine.forEach((it) => {
    lineState.value[it].isShow = true;
  });
}

function hideLine() {
  lines.forEach((it) => {
    lineState.value[it].isShow = false;
  });
}

function isNearly(target: number, cur: number) {
  return Math.abs(target - cur) < diff;
}

function getMarkLineStyle(line: LineState): StyleValue {
  const { left, top } = line.style;
  return {
    left: left + "px",
    top: top + "px",
  };
}
</script>

<style scoped lang="scss">
.x-line {
  width: 100%;
  height: 2px;
}
.y-line {
  width: 2px;
  height: 100%;
}
</style>
