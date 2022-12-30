import { markRaw } from "vue";
import { ComponentData } from "~/types/lowCode";
import VText from "./VText/index.vue";
import VButton from "./VButton/index.vue";

export const componentlist: ComponentData[] = [
  {
    component: () => markRaw(VText),
    label: "文字",
    propValue: "双击编辑文字",
    icon: "icon-wenzigongju",
    animations: [],
    events: {},
    style: {},
  },
  {
    component: () => markRaw(VButton),
    label: "按钮",
    propValue: "按钮",
    icon: "icon-anniu",
    animations: [],
    events: {},
    style: {},
  },
];
