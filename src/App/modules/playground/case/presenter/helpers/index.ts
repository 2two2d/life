import type { IMap } from "../interface";

const generateInitialMap = (size: number): IMap => {
  const sizedArray = Array.from({ length: size });

  return sizedArray.map(() => sizedArray.map(() => ({ isAlive: false })));
};

export { generateInitialMap };
