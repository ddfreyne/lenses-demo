import React from "react";
import ReactDOM from "react-dom";

import { PersonForm } from "./PersonForm";

import "./styles.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <div className="root">
    <React.StrictMode>
      <PersonForm />
    </React.StrictMode>
  </div>,
  rootElement
);
