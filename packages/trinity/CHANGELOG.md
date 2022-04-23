# react-trinity

## 0.5.5

### Patch Changes

- 364011b: Disable event handling in <Application>... until it's ready. :)

## 0.5.3

### Patch Changes

- 7fd7ed7: Test changeset for seeing if the changesets GitHub Action works again.

## 0.5.0

### Minor Changes

- 3229464: Moved `Ticker`, `useTicker` and `useAnimationFrame` into the main package, and removed the `ticker` entrypoint.
- 954e436: Big refactoring to separate scene contents from user-facing concerns like rendering, event handling etc.
- 3229464: The library now provides an optional `<Application>` component that provides some scaffolding for simple applications, with a default render pipeline.

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

## 0.4.2

### Patch Changes

- 66f09ee: Test patch bump to see if we can get the CD action to work again

## 0.4.1

### Patch Changes

- b183bd6: Integrate Text component into main Trinity package.

## 0.4.0

### Minor Changes

- 154b93c: Introduced new `instancing`, `loaders` and `experiments` entrypoints.
- 55640c6: The Reactor has been moved into the main package's new `reactor` entrypoint.
- d0fc318: Integrate ticker into the main package's new `ticker` entrypoint.
- b9d76cf: No longer export `Engine`. We'll find a nicer top-level abstraction of the important engine bits at some point, but this is not it.
- 09a3024: `makeInstanceComponents` has been integrated into the main package as part of the new `react-trinity/instancing` entrypoint.

## 0.3.3

### Patch Changes

- ea08cf6: Mark all packages as sideeffects-free
- Updated dependencies [ea08cf6]
  - @react-trinity/reactor@0.3.2
  - @react-trinity/ticker@0.3.1

## 0.3.2

### Patch Changes

- 534418c: Tweaks to how three is imported in order to pave the way to tree-shaking support
- Updated dependencies [534418c]
  - @react-trinity/reactor@0.3.1

## 0.3.1

### Patch Changes

- a59a9ed: Re-export all sub package exports, including the default Reactor export

## 0.3.0

### Minor Changes

- e9a14d4: Extracted Ticker code into new @react-trinity/ticker package.
- 22debb8: Make sure everything uses React 18 and Three 139

### Patch Changes

- Updated dependencies [be0105e]
- Updated dependencies [e9a14d4]
- Updated dependencies [22debb8]
  - @react-trinity/reactor@0.3.0
  - @react-trinity/ticker@0.3.0

## 0.2.1

### Patch Changes

- af3db0a: A bit of cleanup
- Updated dependencies [af3db0a]
  - @react-trinity/reactor@0.2.1

## 0.2.0

### Minor Changes

- Let's go.

### Patch Changes

- Updated dependencies
  - @react-trinity/reactor@0.2.0
