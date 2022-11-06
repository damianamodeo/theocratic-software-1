import { createContext, useState } from "react";

export const HeaderContext = createContext();
export const UserIDContext = createContext();

export const Context = ({ children }) => {
  const [header, setHeader] = useState("Personal");
  const [userID, setUserID] = useState("");
  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      <UserIDContext.Provider value={{ userID, setUserID }}>
        {children}
      </UserIDContext.Provider>
    </HeaderContext.Provider>
  );
};
