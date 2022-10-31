import ReactDOM from "react-dom/client";
import "../../src/common/styles/index.css";
import { Navigation } from "./navigation";
import { Context } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context>
    <Navigation />
  </Context>
);
