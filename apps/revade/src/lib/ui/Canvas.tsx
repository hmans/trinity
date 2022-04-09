import { CSSProperties, FC, ReactNode } from "react"

export const Canvas: FC<{
  children?: ReactNode
  className?: string
}> = ({ children, className }) => (
  <div
    className={className}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1,
      userSelect: "none",
      WebkitUserSelect: "none",
      cursor: "default"
    }}
  >
    {children}
  </div>
)
