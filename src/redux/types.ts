export type ActionT = {
  type: string;
  payload: unknown;
};

export type NodeT = {
  id: number;
  x: number;
  y: number;
  bound?: number;
};

export type StateT = {
  rectNodes: Map<number, NodeT>;
};
