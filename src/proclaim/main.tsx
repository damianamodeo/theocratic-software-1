import React from "react";
import ReactDOM from "react-dom/client";
import "../../src/common/styles/index.css";
import { Proclaim } from "./proclaim";
import { Context } from "./services/contexts/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context>
    <Proclaim />
  </Context>
);
