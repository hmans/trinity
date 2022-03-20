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

      float l = linearToRelativeLuminance(colorGame.rgb);

      float step = smoothstep(0.1, 0.5, l) * 0.5;

      gl_FragColor.r = colorGame.r + colorDirt.r * step;
      gl_FragColor.g = colorGame.g + colorDirt.g * step;
      gl_FragColor.b = colorGame.b + colorDirt.b * step;
      gl_FragColor.a = 1.0;
    }`
}
