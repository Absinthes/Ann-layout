import { markRaw } from "vue";
import { ComponentData } from "~/types";
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
    style: {
      left: 0,
      top: 0,
      width: 150,
      height: 20,
    },
    styleCollapse: [],
  },
  {
    component: () => markRaw(VButton),
    label: "按钮",
    propValue: "按钮",
    icon: "icon-anniu",
    animations: [],
    events: {},
    style: {
      left: 0,
      top: 0,
      width: 100,
      height: 50,
      borderRadius: 0,
      borderWidth: 1,
    },
    styleCollapse: [],
  },
];
