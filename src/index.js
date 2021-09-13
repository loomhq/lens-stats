import React from "react";
import ReactDOM from "react-dom";
import { BaseStyles } from "@loomhq/lens";
import App from "./App";

const AppWithStyles = () => (
  <>
    <BaseStyles />
    <App />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<AppWithStyles />, rootElement);
