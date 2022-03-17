import T, { Scene } from "@hmans/trinity"

export const Hud = () => {
  return (
    <>
      <T.AmbientLight intensity={0.4} />
      <T.DirectionalLight intensity={0.6} position={[10, 10, 10]} />

      <T.Mesh>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="red" />
      </T.Mesh>
    </>
  )
}
