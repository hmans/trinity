import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef
} from "react"

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => (
    <button
      onPointerEnter={(e) => (e.target as HTMLButtonElement).focus()}
      ref={forwardedRef}
      style={{ pointerEvents: "all" }}
      {...props}
    />
  )
)
