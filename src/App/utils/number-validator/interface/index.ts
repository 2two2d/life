interface IExactNumberConditionProps {
  exact: number;
}

interface INumberInRangeConditionProps {
  min: number;
  max: number;
}

type INumberValidation =
  | IExactNumberConditionProps
  | INumberInRangeConditionProps;

type INumberValidator = (
  value: number,
  conditions: INumberValidation[],
) => boolean;

export type {
  INumberValidator,
  INumberValidation,
  IExactNumberConditionProps,
  INumberInRangeConditionProps,
};
