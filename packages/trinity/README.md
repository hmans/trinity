# Trinity

### Goals:

- Provide wrapper components for the entire THREE namespace, with a similar API to react-three-fiber
- Allow for stacked scene rendering
- Allow for per-scene virtual resolution scaling
- On-Demand Rendering first (ticker callbacks that warrant a re-render must declare this)
- Provide a solid game-ready ticker (with late & fixed step stages) out of the box
- React 18+, with full support for new concurrent features

### TODO:

Big Features:

- [x] Ticker
- [ ] Events
- [ ] On-Demand Rendering everywhere

Misc:

- [ ] Rename "Scene" to eg. "Layer"?
