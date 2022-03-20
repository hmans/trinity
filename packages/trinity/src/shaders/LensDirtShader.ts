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
    #include <common>

    uniform float opacity;
    uniform sampler2D tDiffuse;
    uniform sampler2D tFoo;
    varying vec2 vUv;

    void main() {
      vec4 colorDirt = texture2D(tFoo, vUv);
      vec4 colorGame = texture2D(tDiffuse, vUv);

      float luminance = linearToRelativeLuminance(colorGame.rgb);
      float step = smoothstep(0.1, 0.5, luminance) * 0.5;

      gl_FragColor = colorGame + colorDirt * step;
    }`
}
