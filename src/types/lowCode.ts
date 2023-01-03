import { Component, Raw } from "vue";
import { Props, WarpFunc } from ".";

export type ComponentStyle = {} & BaseComponentStyle & PartialComponentStyle;

export type BaseComponentStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export type PartialComponentStyle = Partial<{}>;

export type ComponentData = {
  id?: number;
  component: WarpFunc<Raw<Component>>;
  label: string;
  propValue: string | Partial<Props>;
  icon: string | Component;
  animations: any[];
  events: Record<string, Function>;
  style: ComponentStyle;
};
