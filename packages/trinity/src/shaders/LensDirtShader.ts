export const LensDirtShader = {
  uniforms: {
    tDiffuse: { value: null },
    tDirt: { value: null },
    strength: { value: 1.0 },
    minLuminance: { value: 0.1 },
    maxLuminance: { value: 0.5 }
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,

  fragmentShader: `
    #include <common>

    uniform float strength;
    uniform float minLuminance;
    uniform float maxLuminance;
    uniform sampler2D tDiffuse;
    uniform sampler2D tDirt;
    varying vec2 vUv;

    void main() {
      vec4 colorDirt = texture2D(tDirt, vUv);
      vec4 colorGame = texture2D(tDiffuse, vUv);

      float luminance = linearToRelativeLuminance(colorGame.rgb);
      float amount = smoothstep(minLuminance, maxLuminance, luminance) * strength;

      gl_FragColor = colorGame + colorDirt * amount;
    }`
}
