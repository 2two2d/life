import { useCallback, useState } from "react";

import { DEFAULT_PLAYGROUND_SIZE } from "./const";

import { generateInitialMap } from "./helpers";

import type { IMap, IUseLifePlaygroundPresenter } from "./interface";

const useLifePlaygroundPresenter = ({
  playgroundSize = DEFAULT_PLAYGROUND_SIZE,
}: IUseLifePlaygroundPresenter) => {
  const [map, setMap] = useState<IMap>(generateInitialMap(playgroundSize));
  const [isInProcess, setIsInProcess] = useState<boolean>(false);

  const handleClick = ([rowIndex, cellIndex]: [number, number]) => {
    if (isInProcess) return;

    setMap((prev) => {
      return prev.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) =>
              cIdx === cellIndex ? { ...cell, isAlive: !cell.isAlive } : cell,
            )
          : row,
      );
    });
  };

  const handleStartGame = useCallback(() => {
    setIsInProcess(true);

    return null;
  }, []);

  return { map, handleClick, handleStartGame };
};

export { useLifePlaygroundPresenter };
