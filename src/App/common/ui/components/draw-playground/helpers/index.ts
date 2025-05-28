import type { MouseEvent } from "react";

const eventHasOffsetProperties = (
  event: MouseEvent,
): event is MouseEvent & {
  target: MouseEvent["target"] & { offsetTop: number; offsetLeft: number };
} => {
  const condition =
    "target" in event &&
    "offsetTop" in event.target &&
    "offsetLeft" in event.target;

  if (!condition) {
    throw new Error("Event target must have offset properties!");
  }

  return true;
};

export { eventHasOffsetProperties };
