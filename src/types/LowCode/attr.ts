import { Component } from "vue";
import { ComponentData, ComponentStyle } from ".";
import { SelectItemType } from "../basicType";

export type Attr = {
  name: string;
  prop: keyof ComponentData;
  data: AttrData[];
};

export enum AttrComponentTypeEnum {
  INPUT = "input",
  INPUT_NUMBER = "inputNumber",
  SELECT = "select",
  COLOR = "color",
  OTHER = "other",
}

export type AttrData = {
  name: string;
  title: string;
  component: AttrComponentOption[];
};

export type AttrComponentOption<
  T extends AttrComponentTypeEnum = AttrComponentTypeEnum
> = {
  [P in keyof AttrComponentOptionsMap[T]]: AttrComponentOptionsMap[T][P];
};

export type AttrDefaultComponent = {
  name: keyof ComponentStyle | (keyof ComponentStyle)[];
  type: AttrComponentTypeEnum;
  label: string;
  component: Component;
  data: SelectItemType[];
};

export type AttrBaseComponentOptions = {
  name: keyof ComponentStyle;
  label: string;
  component: Component;
};

export type AttrComponentOptionsMap = {
  [AttrComponentTypeEnum.INPUT]: Omit<AttrDefaultComponent, "data">;
  [AttrComponentTypeEnum.INPUT_NUMBER]: Omit<AttrDefaultComponent, "data">;
  [AttrComponentTypeEnum.SELECT]: AttrDefaultComponent;
  [AttrComponentTypeEnum.COLOR]: Omit<AttrDefaultComponent, "data">;
  [AttrComponentTypeEnum.OTHER]: Pick<
    AttrDefaultComponent,
    "type" | "component" | "name"
  >;
};
