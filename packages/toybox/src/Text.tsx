/*

- [ ] Font preloading

*/

import { useConst } from "@hmans/react-toolbox"
import { Primitive, ReactorComponentProps } from "@react-trinity/reactor"
import React, { FC, useEffect } from "react"
import type { ColorRepresentation, Mesh } from "three"
import { Text as TroikaText } from "troika-three-text"

type TextProps = ReactorComponentProps<typeof Mesh> &
  Partial<{
    children: string
    characters: string
    color: ColorRepresentation
    fontSize: number
    maxWidth: number
    lineHeight: number
    letterSpacing: number
    textAlign: "left" | "right" | "center" | "justify"
    font: string
    anchorX: number | "left" | "center" | "right"
    anchorY:
      | number
      | "top"
      | "top-baseline"
      | "middle"
      | "bottom-baseline"
      | "bottom"
    clipRect: [number, number, number, number]
    depthOffset: number
    direction: "auto" | "ltr" | "rtl"
    overflowWrap: "normal" | "break-word"
    whiteSpace: "normal" | "overflowWrap" | "overflowWrap"
    outlineWidth: number | string
    outlineOffsetX: number | string
    outlineOffsetY: number | string
    outlineBlur: number | string
    outlineColor: ColorRepresentation
    outlineOpacity: number
    strokeWidth: number | string
    strokeColor: ColorRepresentation
    strokeOpacity: number
    text: string
    fillOpacity: number
    debugSDF: boolean
  }>

export const Text: FC<TextProps> = ({ children, ...props }) => {
  const troika = useConst(() => new TroikaText())

  /* Separate plaintext nodes from the rest */
  const [nodes, text] = React.useMemo(() => {
    const nodes: React.ReactNode[] = []
    let text = ""

    React.Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        text += child
      } else {
        nodes.push(child)
      }
    })

    return [nodes, text]
  }, [children])

  /* Sync text object every time props change */
  useEffect(() => troika.sync())

  return (
    <Primitive object={troika} text={text} {...props}>
      {nodes}
    </Primitive>
  )
}
