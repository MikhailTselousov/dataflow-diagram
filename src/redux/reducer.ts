import {
  MOVE,
  BOUND,
  UNBOUND,
  ADD_RECT_NODE,
  DEL_RECT_NODE,
} from "./actionConsts";

import { StateT, ActionT, NodeT } from "./types";

const INITIAL_STATE: StateT = { rectNodes: new Map<number, NodeT>() };

export function mainReducer(
  state: StateT = INITIAL_STATE,
  action: ActionT
): StateT {
  switch (action.type) {
    case MOVE: {
      const { id, x, y } = action.payload as Pick<NodeT, "id" | "x" | "y">;
      const rectNodes = state.rectNodes;
      const node = rectNodes.get(id);
      node && rectNodes.set(id, { ...node, x, y });
      return { ...state, rectNodes: new Map(rectNodes.entries()) };
    }
    case BOUND: {
      const { id, bound } = action.payload as { id: number; bound: number };
      const rectNodes = state.rectNodes;
      const node = rectNodes.get(id);
      node && rectNodes.set(id, { ...node, bound });
      return { ...state, rectNodes: new Map(rectNodes.entries()) };
    }
    case ADD_RECT_NODE: {
      const { x, y } = action.payload as { x: number; y: number };
      const rectNodes = state.rectNodes;
      const currentId =
        rectNodes.size === 0 ? 0 : Math.max(...rectNodes.keys()) + 1;
      rectNodes.set(currentId, { id: currentId, x, y });
      return { ...state, rectNodes: new Map(rectNodes.entries()) };
    }
    case DEL_RECT_NODE: {
      const { id } = action.payload as { id: number };
      const rectNodes = state.rectNodes;
      rectNodes.delete(id);
      return { ...state, rectNodes: new Map(rectNodes.entries()) };
    }
    default:
      return state;
  }
}
