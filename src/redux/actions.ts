import {
  MOVE,
  BOUND,
  UNBOUND,
  ADD_RECT_NODE,
  DEL_RECT_NODE,
} from "./actionConsts";

export const move = (id: number, x: number, y: number) => ({
  type: MOVE,
  payload: { id, x, y },
});

export const bound = (id: number, bound: number) => ({
  type: BOUND,
  payload: { id, bound },
});

export const unBound = (id: number) => ({
  type: UNBOUND,
  payload: { id },
});

export const addRectNode = (x: number, y: number) => ({
  type: ADD_RECT_NODE,
  payload: { x, y },
});

export const delRectNode = (id: number) => ({
  type: DEL_RECT_NODE,
  payload: { id },
});
