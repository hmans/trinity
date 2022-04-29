import T, { Application, FancyRenderPipeline } from "react-trinity"

const ShadyBall = () => {
  const vertexShader = `
    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
    }
  `

  const fragmentShader = `
    void main(){
      gl_FragColor = vec4(1, 0, 0, 1);
    }
  `

  return (
    <T.Mesh>
      <T.SphereGeometry />
      <T.ShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </T.Mesh>
  )
}

const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.Color args={[0.2, 0.2, 0.2]} attach="background" />
        <T.Fog args={["#000", 64, 128]} />
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.3} />
        <T.DirectionalLight position={[100, 300, 100]} intensity={0.7} />

        <ShadyBall />
      </>
    )}
  </Application>
)

export default App
