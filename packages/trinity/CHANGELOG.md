# react-trinity

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
