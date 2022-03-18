import T, { Engine, View } from "@hmans/trinity"

export const Game = () => {
  return (
    <Engine>
      <View>
        <T.Mesh>
          <T.DodecahedronBufferGeometry />
          <T.MeshNormalMaterial />
        </T.Mesh>
      </View>
    </Engine>
  )
}
