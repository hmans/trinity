export const collisions = (group: number, collideWithGroup: number) =>
  (group << 16) + collideWithGroup
