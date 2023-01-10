import Input from "~/LowCodeComponents/Attrs/baseAttr/Input.vue";
import Border from "~/LowCodeComponents/Attrs/Border.vue";
import { Attr, AttrComponentTypeEnum, AttrComponentOption } from "~/types";

export enum BorderRadiusEnum {
  NONE = "None",
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
        name: ["left", "top", "width", "height"],
        title: "基础属性",
        component: [
          {
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "x 坐标",
            component: Input,
          },
          {
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "y 坐标",
            component: Input,
          },
          {
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "宽",
            component: Input,
          },
          {
            type: AttrComponentTypeEnum.INPUT_NUMBER,
            label: "高",
            component: Input,
          },
        ] as [
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>,
          AttrComponentOption<AttrComponentTypeEnum.INPUT_NUMBER>
        ],
      },
      {
        name: ["background"],
        title: "背景色",
        component: [],
      },
      {
        name: ["shadow"],
        title: "阴影",
        component: [],
      },
      {
        name: ["borderWidth", "borderRadius"],
        title: "轮廓样式",
        component: [
          {
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
    title: BorderRadiusEnum.NONE,
  },
  {
    value: 6,
    title: BorderRadiusEnum.M,
  },
  {
    value: 99999,
    title: BorderRadiusEnum.L,
  },
];
