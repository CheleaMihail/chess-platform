import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

import store from "./redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
