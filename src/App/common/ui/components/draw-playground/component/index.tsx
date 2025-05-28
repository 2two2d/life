import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefRenderFunction,
  type MouseEventHandler,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { TEN, FIRST, ZERO } from "@common/const";

import { eventHasOffsetProperties } from "../helpers";

import { BASE_PLAYGROUND_CANVAS_CELL_SIZE } from "../const";

import type { IDrawPlaygroundProps, IMargins } from "../interface";

const PlaygroundCanvasRenderFunction: ForwardRefRenderFunction<
  HTMLCanvasElement,
  IDrawPlaygroundProps
> = (
  {
    map,
    onClick,
    cellIsPaintedKey = "isFilled",
    cellSize = BASE_PLAYGROUND_CANVAS_CELL_SIZE,
  },
  forwardRef: ForwardedRef<HTMLCanvasElement> = null,
) => {
  const localRef = useRef<HTMLCanvasElement>(null);
  const [ctx2d, setCtx2d] = useState<CanvasRenderingContext2D | null>(null);

  useImperativeHandle(forwardRef, () => localRef.current!, [localRef]);

  const { width, height } = useMemo(
    () => ({ width: map.length, height: map[FIRST]?.length ?? ZERO }),
    [map],
  );

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!eventHasOffsetProperties(event)) return;

    const {
      target: { offsetLeft, offsetTop },
      clientX,
      clientY,
    } = event;

    const margins: IMargins = {
      x: clientX - offsetLeft,
      y: clientY - offsetTop,
    };

    Object.keys(margins).forEach((key) => {
      const k = key as keyof IMargins;
      margins[k] =
        (Math.floor(margins[k] / TEN) * TEN) / BASE_PLAYGROUND_CANVAS_CELL_SIZE;
    });

    onClick([margins.x, margins.y]);
  };

  useEffect(() => {
    if (!ctx2d) return;

    ctx2d.fillStyle = "white";
    ctx2d.fillRect(ZERO, ZERO, width * cellSize, height * cellSize);

    ctx2d.fillStyle = "black";

    map.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (item[cellIsPaintedKey]) {
          ctx2d.fillRect(
            rowIndex * cellSize,
            itemIndex * cellSize,
            cellSize,
            cellSize,
          );
        }
      });
    });
  }, [map, cellSize, ctx2d]);

  useEffect(() => {
    if (localRef.current && !ctx2d) setCtx2d(localRef.current.getContext("2d"));
  }, [localRef]);

  return (
    <canvas
      className="border-2 border-b-blue-500"
      ref={localRef}
      onClick={handleClick}
      width={width * cellSize}
      height={height * cellSize}
    />
  );
};

export const PlaygroundCanvas = forwardRef(PlaygroundCanvasRenderFunction);
