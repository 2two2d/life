import {
  isExactNumberConditionsGuard,
  isNumberInRangeConditionGuard,
} from "@utils/number-validator/typeguards";

import type { INumberValidator } from "../interface";

const numberValidator: INumberValidator = (value, conditions) => {
  let isValid = false;

  for (const condition of conditions) {
    if (isExactNumberConditionsGuard(condition)) {
      if (value === condition.exact) isValid = true;
    }

    if (isNumberInRangeConditionGuard(condition)) {
      if (value >= condition.min && value <= condition.max) isValid = true;
    }

    if (isValid) break;
  }

  return isValid;
};

export { numberValidator };
