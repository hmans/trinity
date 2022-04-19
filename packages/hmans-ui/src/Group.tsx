import styled from "@emotion/styled"

export type GroupProps = {
  horizontal?: boolean
  vertical?: boolean
  spacing?: number | string
}

export const Group = styled.div<GroupProps>(
  ({ horizontal, vertical, spacing = 0 }) => ({
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    gap: spacing
  })
)
