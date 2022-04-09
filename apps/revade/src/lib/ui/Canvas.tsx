import { FC, ReactNode } from "react"

export const Canvas: FC<{ children?: ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1,
      userSelect: "none"
    }}
  >
    {children}
  </div>
)
