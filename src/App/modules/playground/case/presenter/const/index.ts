const DEFAULT_PLAYGROUND_SIZE = 40;

const GAME_RULES = {
  cellToLiveCondition: { exact: 3 },
  cellToDieCondition: { min: 2, max: 3 },
};

export { DEFAULT_PLAYGROUND_SIZE, GAME_RULES };
