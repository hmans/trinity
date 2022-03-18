import {
  clampVector,
  compositeKeyboardVector,
  Controller,
  gamepadAxisVector,
  VectorControl
} from "@hmans/controlfreak"

export const controller = new Controller()

controller
  .addControl("move", VectorControl)
  .addStep(compositeKeyboardVector("w", "s", "a", "d"))
  .addStep(gamepadAxisVector(0, 1))
  .addStep(clampVector(1))
