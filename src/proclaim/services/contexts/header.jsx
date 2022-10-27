import { createContext, useState } from "react";

export const HeaderContext = createContext();

export const Header = ({ children }) => {
  const [title, setTitle] = useState("Personal");
  return (
    <HeaderContext.Provider value={{ title, setTitle }}>{children}</HeaderContext.Provider>
  );
};
