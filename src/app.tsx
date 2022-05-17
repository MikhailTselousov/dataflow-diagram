import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useSelector, useDispatch } from "react-redux";

import { move, addRectNode } from "./redux/actions";

import RectNode from "./rectNode";
import PinLine from "./pinLine";
import { NodeT, StateT } from "./redux/types";

import { BoundContext } from "./contexts";

export default function App() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const rectNodes = useSelector<StateT, Map<number, NodeT>>(
    (state) => state.rectNodes
  );
  const rectNodesValues = Array.from(rectNodes.values());
  const dispatch = useDispatch();

  const [preBound, setPreBound] = useState<number | null>(null);

  return (
    <Stage width={width - 100} height={height - 100}>
      <Layer>
        <BoundContext.Provider value={{ preBound, setPreBound }}>
          {rectNodesValues.map(({ id, x, y, bound }) => {
            if (bound !== undefined) {
              const endRectNode = rectNodes.get(bound);
              return (
                endRectNode && (
                  <PinLine
                    key={id}
                    pinStart={{ x, y }}
                    pinEnd={{ x: endRectNode.x, y: endRectNode.y + 100 / 2 }}
                  />
                )
              );
            }
          })}
          {rectNodesValues.map(({ id, x, y }) => (
            <RectNode
              key={id}
              id={id.toString()}
              x={x}
              y={y}
              draggable
              onDragMove={(evt) =>
                dispatch(move(id, evt.target.x(), evt.target.y()))
              }
              dispatch={dispatch}
            />
          ))}
          <Rect
            x={width - 200}
            y={height - 200}
            color="blue"
            fill="blue"
            width={100}
            height={100}
            onClick={() => dispatch(addRectNode(100, height - 200))}
          />
        </BoundContext.Provider>
      </Layer>
    </Stage>
  );
}
