interface IDrawPlaygroundProps<
  T extends { [key: string]: boolean } = { isFilled: boolean },
  K extends keyof T = "isFilled",
> {
  map: T[][];
  onClick: (index: [number, number]) => void;
  cellIsPaintedKey?: K;
  cellSize?: number;
}

interface IMargins {
  x: number;
  y: number;
}

export type { IDrawPlaygroundProps, IMargins };
