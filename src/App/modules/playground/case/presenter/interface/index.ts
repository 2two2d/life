import type { ICellEntity } from "src/domain";

interface IUseLifePlaygroundPresenter {
  playgroundSize?: number;
}

type IMap = ICellEntity[][];

type IMapCellIndex = [number, number];

export type { IMap, IUseLifePlaygroundPresenter, IMapCellIndex };
