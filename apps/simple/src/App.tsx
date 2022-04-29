import T, { Application, FancyRenderPipeline } from "react-trinity"
import { Color } from "three"

const ShadyBall = () => {
  const vertexShader = `
    varying vec3 vNormal;

    void main(){
      vec3 scale = vec3(1., 1., 1.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale, 1.);
      vNormal = normal;
    }
  `

  const fragmentShader = `
    uniform vec3 uColor;
    varying vec3 vNormal;

    void main(){
      gl_FragColor = vec4(uColor * vNormal, 1);
    }
  `

  return (
    <T.Mesh>
      <T.SphereGeometry />
      <T.ShaderMaterial
        uniforms={{ uColor: { value: new Color("white") } }}
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
