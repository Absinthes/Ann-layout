import { Component, Raw } from "vue";
import { Props, WarpFunc } from ".";

export type ComponentStyle = {} & BaseComponentStyle & PartialComponentStyle;

export type BaseComponentStyle = {
  width: number;
  height: number;
};

export type PartialComponentStyle = Partial<{
  left: number;
  top: number;
}>;

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
