import { Button } from "@inputs/Button";
import { createNewCollection } from "@test-firebase/CreateFirestoreCollection";
import ReactDOM from "react-dom/client";
import "../../src/common/styles/index.css";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className={'p-8'}>
    <Button action={()=>{createNewCollection()}}>Create</Button>
    {/* <CreateFirestoreCollection></CreateFirestoreCollection>   */}
  </div>
);
