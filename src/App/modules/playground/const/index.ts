import { ONE, TWO } from "@common/const";

const GAME_RULES_IN_TEXT: string[] = [
  "На поле существуют живые (закрашенные) и мёртвые (пустые) клетки",
  "Клетка оживает, если вокург неё ровно 3 живые клетки",
  "Клетка остаётся живой в случае, если вокруг неё 2 или 3 живые клетки, в ином случае она умирает",
] as const;

const GAME_SPEED_COEFFICIENTS: number[] = [ONE / TWO, ONE, TWO] as const;

export { GAME_RULES_IN_TEXT, GAME_SPEED_COEFFICIENTS };
