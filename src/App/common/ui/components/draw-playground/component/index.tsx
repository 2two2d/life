import {
  useRef,
  useState,
  useEffect,
  useMemo,
  type MouseEventHandler,
} from "react";

import { clsx } from "clsx";
import { TEN, FIRST, ZERO } from "@common/const";

import { eventHasOffsetProperties } from "../helpers";
import { BASE_PLAYGROUND_CANVAS_CELL_SIZE } from "../const";

import type { IDrawPlaygroundProps, IMargins } from "../interface";

export function PlaygroundCanvas<T>({
  map,
  onClick,
  isPainted,
  cellSize = BASE_PLAYGROUND_CANVAS_CELL_SIZE,
  className,
}: IDrawPlaygroundProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx2d, setCtx2d] = useState<CanvasRenderingContext2D | null>(null);

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
    if (!ctx2d && canvasRef.current) {
      setCtx2d(canvasRef.current.getContext("2d"));
    }
  }, [ctx2d]);

  useEffect(() => {
    if (!ctx2d) return;

    ctx2d.fillStyle = "black";
    ctx2d.fillRect(ZERO, ZERO, width * cellSize, height * cellSize);

    ctx2d.fillStyle = "white";

    map.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (isPainted(item)) {
          ctx2d.fillRect(
            rowIndex * cellSize,
            itemIndex * cellSize,
            cellSize,
            cellSize,
          );
        }
      });
    });
  }, [map, cellSize, ctx2d, isPainted, width, height]);

  return (
    <canvas
      className={clsx("!block !w-auto !h-auto !self-center", className)}
      ref={canvasRef}
      onClick={handleClick}
      width={width * cellSize}
      height={height * cellSize}
    />
  );
}
