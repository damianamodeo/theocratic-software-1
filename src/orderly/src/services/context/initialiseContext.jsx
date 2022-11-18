import { createContext, useState } from "react";

export const PageContext = createContext();

export const InitialiseContext = ({ children }) => {
  const [page, setPage] = useState("PersonalList");
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
