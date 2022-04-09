import { FC, ReactNode } from "react"

export const Panel: FC<{ children?: ReactNode }> = ({ children }) => (
  <div>{children}</div>
)
