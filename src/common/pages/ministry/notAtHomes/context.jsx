import { createContext, useState } from "react";

export const PageContext = createContext();
export const AddressesContext = createContext();
export const AddressContext = createContext();

export const NotAtHomesContext = ({ children }) => {
  const [addresses, setAddresses] = useState("");
  const [address, setAddress] = useState("");
  const [page, setPage] = useState("Not At Homes");
  return (
    <PageContext.Provider value={{ page, setPage }}>
      <AddressesContext.Provider value={{ addresses, setAddresses }}>
        <AddressContext.Provider value={{ address, setAddress }}>
          {children}
        </AddressContext.Provider>
      </AddressesContext.Provider>
    </PageContext.Provider>
  );
};
