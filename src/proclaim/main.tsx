import ReactDOM from "react-dom/client";
import "../../src/common/styles/index.css";
import { MainPage } from "./src/components/MainPage.jsx";
import { Context } from "./src/services/context/mainContext.jsx";
import { NotAtHomesContext } from "./src/services/context/notAtHomesContext.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context>
    <NotAtHomesContext>
      <MainPage />
    </NotAtHomesContext>
  </Context>
);
