import React from "react";
import ReactDOM from "react-dom";

import { PersonForm } from "./PersonForm";

import "./styles.css";

const rootElement = document.getElementById("lenses-demo-root");

ReactDOM.render(
  <div className="lenses-demo">
    <React.StrictMode>
      <PersonForm />
    </React.StrictMode>
  </div>,
  rootElement
);
