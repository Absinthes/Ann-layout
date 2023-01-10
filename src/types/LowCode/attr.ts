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
  OTHER = "other",
}

export type AttrData = {
  name: (keyof ComponentStyle)[];
  title: string;
  component: (AttrComponentOption | AttrDefaultComponent)[];
};

export type AttrComponentOption<
  T extends AttrComponentTypeEnum = AttrComponentTypeEnum
> = {
  [P in keyof AttrComponentOptionsMap[T]]: AttrComponentOptionsMap[T][P];
};

export type AttrDefaultComponent = {
  type: AttrComponentTypeEnum.OTHER;
  label?: string;
  component: Component;
};

export type AttrComponentOptionsMap = {
  [AttrComponentTypeEnum.INPUT]: {
    type: AttrComponentTypeEnum.INPUT;
    label: string;
    component: Component;
  };
  [AttrComponentTypeEnum.INPUT_NUMBER]: {
    type: AttrComponentTypeEnum.INPUT_NUMBER;
    label: string;
    component: Component;
  };
  [AttrComponentTypeEnum.SELECT]: {
    type: AttrComponentTypeEnum.SELECT;
    label: string;
    data: SelectItemType[];
    component: Component;
  };
  [AttrComponentTypeEnum.OTHER]: AttrDefaultComponent;
};
