---
"react-trinity": minor
---

The library now provides an optional `<Application>` component that provides some scaffolding for simple applications, with a default render pipeline.

```tsx
const App = () => (
  <Application>
    {({ setCamera }) => (
      <>
        <T.PerspectiveCamera position={[0, 0, 10]} ref={setCamera} />

        <T.AmbientLight intensity={0.2} />
        <T.DirectionalLight intensity={0.7} position={[10, 10, 10]} />

        <T.Mesh>
          <T.DodecahedronGeometry />
          <T.MeshStandardMaterial color="hotpink" />
        </T.Mesh>
      </>
    )}
  </Application>
)
```
