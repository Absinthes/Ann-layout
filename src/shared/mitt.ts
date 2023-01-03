import mitt from "mitt"

type Events = {
  move: undefined,
  unMove: undefined
}

export const emitter = mitt<Events>()