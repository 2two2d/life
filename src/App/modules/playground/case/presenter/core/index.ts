import { useCallback, useRef, useState } from "react";

import { numberValidator } from "@utils";

import { countSurroundingLivingCells, generateInitialMap } from "../helpers";

import {
  DEFAULT_GAME_INTERVAL_DELAY,
  DEFAULT_PLAYGROUND_SIZE,
  GAME_RULES,
} from "../const";

import type { IMap } from "../interface";

const useLifePlaygroundPresenter = (size?: number) => {
  const [map, setMap] = useState<IMap>(
    generateInitialMap(size ?? DEFAULT_PLAYGROUND_SIZE),
  );
  const [isInProcess, setIsInProcess] = useState<boolean>(false);
  const [speedCoefficient, setSpeedCoefficient] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    intervalRef.current = setInterval(() => {
      setMap((prevMap) => {
        return prevMap.map((row, x) =>
          row.map((cell, y) => {
            const surroundingLivingCells = countSurroundingLivingCells(
              [x, y],
              prevMap,
            );

            const shouldLive = cell.isAlive
              ? numberValidator(surroundingLivingCells, [
                  {
                    min: GAME_RULES.cellToDieCondition.min,
                    max: GAME_RULES.cellToDieCondition.max,
                  },
                ])
              : numberValidator(surroundingLivingCells, [
                  { exact: GAME_RULES.cellToLiveCondition.exact },
                ]);

            return { isAlive: shouldLive };
          }),
        );
      });
    }, DEFAULT_GAME_INTERVAL_DELAY * speedCoefficient);
  }, []);

  const handleStopGame = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    setMap((prev) => generateInitialMap(prev.length));

    setIsInProcess(false);
  }, []);

  const handleChangeSpeedCoefficient = (value: number | string) => {
    setSpeedCoefficient(Number(value));

    handleStopGame();
  };

  return {
    map,
    handleClick,
    handleStartGame,
    handleStopGame,
    isInProcess,
    handleChangeSpeedCoefficient,
  };
};

export { useLifePlaygroundPresenter };
