import Input from "~/LowCodeComponents/Attrs/baseAttr/Input.vue";
import Color from "~/LowCodeComponents/Attrs/baseAttr/Color.vue";
import Border from "~/LowCodeComponents/Attrs/Border.vue";
import Shadow from "~/LowCodeComponents/Attrs/Shadow.vue";
import { Attr, AttrComponentTypeEnum, AttrComponentOption } from "~/types";

export enum SizeEnum {
  NONE = "None",
  S = "S",
  M = "M",
  L = "L",
}

export const Attrs: Attr[] = [
  // {
  //   name: "内容",
  //   data: [
  //     {
  //       name: "prop",
  //       title: "属性",
  //       component: [
  //         {
  //           type: AttrComponentTypeEnum.INPUT,
  //           label: "内容",
  //           component: Input,
  //         },
  //       ] as [AttrComponentOption<AttrComponentTypeEnum.INPUT>],
  //     },
  //   ],
  // },
  {
    name: "样式",
    prop: "style",
    data: [
      {
        name: "baseAttr",
        title: "基础属性",
        component: [
          {
            name: "left",
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "x 坐标",
            component: Input,
          },
          {
            name: "top",
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "y 坐标",
            component: Input,
          },
          {
            name: "width",
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "宽",
            component: Input,
          },
          {
            name: "height",
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "高",
            component: Input,
          },
          {
            name: "rotate",
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "旋转角度",
            component: Input,
          },
          {
            name: "background",
            type: AttrComponentTypeEnum.COLOR,
            label: "背景色",
            component: Color,
          },
          {
            name: "color",
            type: AttrComponentTypeEnum.COLOR,
            label: "文本色",
            component: Color,
          },
        ] as [
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.COLOR>,
          AttrComponentOption<AttrComponentTypeEnum.COLOR>
        ],
      },
      {
        name: "boxShadow",
        title: "阴影",
        component: [
          {
            name: "boxShadow",
            type: AttrComponentTypeEnum.OTHER,
            component: Shadow,
          },
        ] as [AttrComponentOption<AttrComponentTypeEnum.OTHER>],
      },
      {
        name: "border",
        title: "轮廓样式",
        component: [
          {
            name: ["borderRadius", "borderWidth"],
            type: AttrComponentTypeEnum.OTHER,
            component: Border,
          },
        ] as [AttrComponentOption<AttrComponentTypeEnum.OTHER>],
      },
    ],
  },
];

export const borderRadiusOptions = [
  {
    value: 0,
    title: SizeEnum.NONE,
  },
  {
    value: 6,
    title: SizeEnum.M,
  },
  {
    value: 99999,
    title: SizeEnum.L,
  },
] as const;

export const shadowOptions = [
  {
    value: SizeEnum.NONE,
    title: SizeEnum.NONE,
  },
  {
    value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    title: SizeEnum.S,
  },
  {
    value:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    title: SizeEnum.M,
  },
  {
    value:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    title: SizeEnum.L,
  },
];
