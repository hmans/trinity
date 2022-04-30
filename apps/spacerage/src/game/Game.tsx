import T, { Application } from "react-trinity"

export const Game = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.Color args={[0.2, 0.2, 0.2]} attach="background" />
        <T.Fog args={["#000", 64, 128]} />
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight position={[100, 300, 100]} intensity={0.7} />

        <T.Mesh>
          <T.DodecahedronGeometry />
          <T.MeshNormalMaterial />
        </T.Mesh>
      </>
    )}
  </Application>
)
