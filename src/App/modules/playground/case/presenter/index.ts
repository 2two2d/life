import { useCallback, useState } from "react";

import { numberValidator } from "@utils";

import { DEFAULT_PLAYGROUND_SIZE } from "./const";

import { countSurroundingLivingCells, generateInitialMap } from "./helpers";

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

    setInterval(() => {
      setMap((prevMap) => {
        return prevMap.map((row, x) =>
          row.map((cell, y) => {
            const surroundingLivingCells = countSurroundingLivingCells(
              [x, y],
              prevMap,
            );

            const shouldLive = cell.isAlive
              ? numberValidator(surroundingLivingCells, [{ min: 2, max: 3 }])
              : numberValidator(surroundingLivingCells, [{ exact: 3 }]);

            return { isAlive: shouldLive };
          }),
        );
      });
    }, 100);
  }, [map]);

  return { map, handleClick, handleStartGame };
};

export { useLifePlaygroundPresenter };
