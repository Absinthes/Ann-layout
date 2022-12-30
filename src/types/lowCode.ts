import { Component, Raw } from "vue"
import { Props, WarpFunc } from "."

export type ComponentStyle = {

}

export type ComponentData = {
  id?: number,
  component: WarpFunc<Raw<Component>>,                                                                                                                                                                                                                            
  label: string,
  propValue: string | Partial<Props>,
  icon: string | Component,
  animations: any[],
  events: Record<string, Function>,
  style: Partial<ComponentStyle>
}

