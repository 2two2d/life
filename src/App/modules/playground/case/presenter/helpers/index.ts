import { numberValidator } from "@utils";

import { FIRST, ONE, ZERO } from "@common/const";

import type { IMap } from "../interface";

const generateInitialMap = (size: number): IMap => {
  const sizedArray = Array.from({ length: size });

  return sizedArray.map(() => sizedArray.map(() => ({ isAlive: false })));
};

const countSurroundingLivingCells = (
  [x, y]: [number, number],
  map: IMap,
): number => {
  const directions = [
    [-ONE, -ONE],
    [-ONE, ZERO],
    [-ONE, ONE],
    [ZERO, -ONE],
    [ZERO, ONE],
    [ONE, -ONE],
    [ONE, ZERO],
    [ONE, ONE],
  ];

  const rows = map.length;
  const cols = map[FIRST]?.length || ZERO;

  let count = ZERO;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      numberValidator(nx, [{ min: ZERO, max: rows - ONE }]) &&
      numberValidator(ny, [{ min: ZERO, max: cols - ONE }]) &&
      map[nx][ny]?.isAlive
    )
      count++;
  }

  return count;
};

export { generateInitialMap, countSurroundingLivingCells };
