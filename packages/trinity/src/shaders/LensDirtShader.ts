export const LensDirtShader = {
  uniforms: {
    tDiffuse: { value: null },
    tFoo: { value: null }
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,

  fragmentShader: `
    uniform float opacity;
    uniform sampler2D tDiffuse;
    uniform sampler2D tFoo;
    varying vec2 vUv;

    void main() {
      vec4 colorDirt = texture2D(tFoo, vUv);
      vec4 colorGame = texture2D(tDiffuse, vUv);
      float strength = 0.2;

      gl_FragColor = mix(colorGame, colorDirt, strength);
    }`
}
