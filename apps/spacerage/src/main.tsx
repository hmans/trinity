import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"
import * as RAPIER from "@dimforge/rapier3d-compat"

RAPIER.init().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)
