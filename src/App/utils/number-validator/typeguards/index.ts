import type {
  IExactNumberConditionProps,
  INumberInRangeConditionProps,
  INumberValidation,
} from "@utils/number-validator/interface";

const isExactNumberConditionsGuard = (
  condition: INumberValidation,
): condition is IExactNumberConditionProps => {
  return "exact" in condition;
};

const isNumberInRangeConditionGuard = (
  condition: INumberValidation,
): condition is INumberInRangeConditionProps => {
  return "max" in condition && "min" in condition;
};

export { isExactNumberConditionsGuard, isNumberInRangeConditionGuard };
