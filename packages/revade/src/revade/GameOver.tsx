import { Text } from "@hmans/trinity"

export const GameOver = () => {
  return (
    <>
      <Text
        rotation-z={-0.2}
        fontSize={10}
        color="hotpink"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        GAME OVER
      </Text>
    </>
  )
}
