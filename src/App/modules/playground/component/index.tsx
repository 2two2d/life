import { PlaygroundCanvas } from "@common/ui/components/draw-playground";

import { useLifePlaygroundPresenter } from "../case";

import type { ReactNode } from "react";

const LifePlayground = (): ReactNode => {
  const { map, handleClick, handleStartGame } = useLifePlaygroundPresenter({});

  return (
    <div className="mt-20 ml-20">
      <PlaygroundCanvas
        map={map}
        onClick={handleClick}
        cellIsPaintedKey="isAlive"
      />

      <button onClick={handleStartGame}>start</button>
    </div>
  );
};

export { LifePlayground };
