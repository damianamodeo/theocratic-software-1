import { createContext, useState } from "react";

export const PageContext = createContext(null);
export const AddressFormContext = createContext(null);
export const AddressContext = createContext(null);
export const MultipleEditContext = createContext(null);

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const NotAtHomesContext = ({ children }: ThemeContextProviderProps) => {
  const [addressForm, setAddressForm] = useState({
    mapNumber: "",
    suburb: "",
    street: "",
    houseNumber: "",
    unitNumber: "",
  });
  const [address, setAddress] = useState("");
  const [page, setPage] = useState("PersonalList");
  const [multipleEdit, setMultipleEdit] = useState({
    key: "",
    oldSuburb: "",
    newSuburb: "",
    oldStreet: "",
    newStreet: "",
  });
  return (
    <PageContext.Provider value={{ page, setPage }}>
      <AddressFormContext.Provider value={{ addressForm, setAddressForm }}>
        <AddressContext.Provider value={{ address, setAddress }}>
          <MultipleEditContext.Provider
            value={{ multipleEdit, setMultipleEdit }}
          >
            {children}
          </MultipleEditContext.Provider>
        </AddressContext.Provider>
      </AddressFormContext.Provider>
    </PageContext.Provider>
  );
};
