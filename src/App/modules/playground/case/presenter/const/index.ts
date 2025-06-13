import { MILLISECONDS_IN_SECOND, TWO } from "@common/const";

const DEFAULT_PLAYGROUND_SIZE = 40;

const GAME_RULES = {
  cellToLiveCondition: { exact: 3 },
  cellToDieCondition: { min: 2, max: 3 },
};

const DEFAULT_GAME_INTERVAL_DELAY = MILLISECONDS_IN_SECOND / TWO;

export { DEFAULT_PLAYGROUND_SIZE, GAME_RULES, DEFAULT_GAME_INTERVAL_DELAY };
