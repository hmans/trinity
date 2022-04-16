import {
  BooleanControl,
  Controller,
  GamepadDevice,
  KeyboardDevice,
  processors,
  VectorControl
} from "@hmans/controlfreak"
import { touchDevice } from "./TouchController"

export const controller = new Controller()

const keyboard = new KeyboardDevice()
const gamepad = new GamepadDevice()

controller.addDevice(keyboard)
controller.addDevice(gamepad)
controller.addDevice(touchDevice)

controller
  .addControl("move", VectorControl)
  .addStep(
    keyboard.compositeVector(
      ["KeyW", "ArrowUp"],
      ["KeyS", "ArrowDown"],
      ["KeyA", "ArrowLeft"],
      ["KeyD", "ArrowRight"]
    )
  )
  .addStep(gamepad.axisVector(0, 1))
  .addStep(touchDevice.applyVirtualStickVector)
  .addStep(processors.clampVector(1))

controller
  .addControl("fire", BooleanControl)
  .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
  .addStep(gamepad.whenButtonPressed(0))
