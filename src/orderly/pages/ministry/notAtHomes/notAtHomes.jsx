import { List } from "./list";
import { useContext } from "react";
import { PageContext } from "../../../../common/pages/ministry/notAtHomes/context";

export const NotAtHomes = () => {
  const { page, setPage } = useContext(PageContext);

  return (
    <>
      <div>{page === "test" ? "test" : ""}</div>
      <List />
    </>
  );
};
