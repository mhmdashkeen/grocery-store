import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./src/store";
import { Provider } from "react-redux";
import "./index.css";
const App = lazy(() => import("./src/App"));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
