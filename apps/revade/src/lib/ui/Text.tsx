import { FC, ReactNode } from "react"

export const Text: FC<{ children?: ReactNode }> = ({ children }) => (
  <div>{children}</div>
)
