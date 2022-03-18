import T, { Engine, Scene } from "@hmans/trinity"

export const Game = () => {
  return (
    <Engine>
      <Scene>
        <T.Mesh>
          <T.DodecahedronBufferGeometry />
          <T.MeshNormalMaterial />
        </T.Mesh>
      </Scene>
    </Engine>
  )
}
