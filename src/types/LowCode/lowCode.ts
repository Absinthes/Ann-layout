import { Raw, Component } from "vue";
import { WarpFunc, Props } from "../basicType";

export type ComponentStyle = {} & BaseComponentStyle & PartialComponentStyle;

export type BaseComponentStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export type PartialComponentStyle = Partial<{
  background: string;
  color: string;
  boxShadow: string;
  borderWidth: number;
  borderRadius: number;
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
  styleCollapse: string[];
};
