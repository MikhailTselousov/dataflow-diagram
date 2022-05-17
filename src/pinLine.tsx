import React from "react";

import { Line } from "react-konva";

type CoordinateType = number | undefined;

type PinLinePropsT = {
  pinStart: {
    x: CoordinateType;
    y: CoordinateType;
  };
  pinEnd:
    | {
        x: number;
        y: number;
      }
    | undefined;
};

export default function PinLine({ pinStart, pinEnd }: PinLinePropsT) {
  const ropeStart: [CoordinateType, CoordinateType] = [
    pinStart.x && pinStart.x + 200,
    pinStart.y && pinStart.y + 100 / 2,
  ];

  const ropeStartCorrection: [CoordinateType, CoordinateType] = [
    pinStart.x &&
      pinEnd &&
      pinStart.x + 200 + (1 / 4) * Math.abs(pinStart.x - pinEnd.x),
    pinStart.y && pinStart.y + 100 / 2,
  ];

  const ropeEnd: [CoordinateType, CoordinateType] = [
    pinEnd && pinEnd.x,
    pinEnd && pinEnd.y,
  ];

  const ropeEndCorrection: [CoordinateType, CoordinateType] = [
    pinStart.x &&
      pinEnd &&
      pinEnd.x - (1 / 4) * Math.abs(pinStart.x - pinEnd.x),
    pinEnd && pinEnd.y,
  ];

  return (
    <Line
      points={
        pinStart.x && pinStart.y && pinEnd
          ? [
              ...(ropeStart as [number, number]),
              ...(ropeStartCorrection as [number, number]),
              ...(ropeEndCorrection as [number, number]),
              ...(ropeEnd as [number, number]),
            ]
          : []
      }
      bezier
      stroke="black"
      strokeWidth={4}
    />
  );
}
