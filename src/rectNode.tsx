import React, { useState, useContext } from "react";
import { Rect, Line, Circle, Text } from "react-konva";

import { useDispatch } from "react-redux";
import { bound, delRectNode } from "./redux/actions";

import { BoundContext } from "./contexts";

import PinLine from "./pinLine";

interface RectNodeProps extends React.ComponentProps<typeof Rect> {}

export default function RectNode({
  x,
  y,
  id,
  dispatch,
  ...restProps
}: RectNodeProps) {
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  }>();

  const [isBounding, setIsBounding] = useState<boolean>();
  const { preBound, setPreBound } = useContext(BoundContext);

  return (
    <>
      {isBounding && <PinLine pinStart={{ x, y }} pinEnd={pointerPosition} />}
      <Rect {...restProps} x={x} y={y} width={200} height={100} fill="green" />

      <Rect
        x={x && x + 200 - 20}
        y={y}
        width={20}
        height={20}
        fill="red"
        onClick={() => id !== undefined && dispatch(delRectNode(+id))}
      />
      <Text
        x={x && x + 200 - 20 + 4}
        y={y && y + 3}
        fontSize={20}
        text="X"
        onClick={() => id !== undefined && dispatch(delRectNode(+id))}
      />
      <Rect
        x={x && x + 200 - 20 / 2}
        y={y && y + 100 / 2 - 20 / 2}
        width={20}
        height={20}
        fill="blue"
        onMouseDown={() => {
          const mousemoveHandler = (event: MouseEvent) => {
            setPointerPosition({ x: event.clientX, y: event.clientY });
            setIsBounding(true);
          };
          const mouseupHandler = (event: MouseEvent) => {
            setIsBounding(false);
            window.removeEventListener("mousemove", mousemoveHandler);
            window.removeEventListener("mouseup", mouseupHandler);
            setPreBound(null);
          };
          window.addEventListener("mousemove", mousemoveHandler);
          window.addEventListener("mouseup", mouseupHandler);
          console.log(id);
          id !== undefined && setPreBound(+id);
        }}
      />
      <Rect
        x={x && x - 20 / 2}
        y={y && y + 100 / 2 - 20 / 2}
        width={20}
        height={20}
        fill="red"
        id={id}
        name={`in pin rect ${restProps.id}`}
        onMouseUp={(evt) =>
          preBound !== null &&
          id !== undefined &&
          dispatch(bound(+preBound, +id))
        }
      />
    </>
  );
}
