interface IDrawPlaygroundProps<T> {
  map: T[][];
  onClick: (index: [number, number]) => void;
  isPainted: (cell: T) => boolean;
  cellSize?: number;
  className?: string;
}

interface IMargins {
  x: number;
  y: number;
}

export type { IDrawPlaygroundProps, IMargins };
