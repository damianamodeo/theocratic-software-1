import { createContext, useState } from "react";

export const HeaderContent = createContext();

export const Context = ({ children }) => {
  const [headerContent, setHeaderContent] = useState("goodbye");
  return (
    <HeaderContent.Provider value={{headerContent, setHeaderContent}}>
      {children}
    </HeaderContent.Provider>
  );
};
