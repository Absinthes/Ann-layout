export type Props = Record<string, PropOption>

export type PropOption = {
  type: String | Number | Boolean | Function,
  default: String | Number | Boolean | Function,
  require: boolean,
}

export type WarpFunc<T> = () => T