import { createContext, useState } from "react";

export const PageContext = createContext();
export const AddressFormContext = createContext();
export const AddressContext = createContext();
export const MultipleEditContext = createContext();

export const NotAtHomesContext = ({ children }) => {
  const [addressForm, setAddressForm] = useState({
    mapNumber: "",
    suburb: "",
    street: "",
    houseNumber: "",
    unitNumber: "",
  });
  const [address, setAddress] = useState("");
  const [page, setPage] = useState("PersonalList");
  const [multipleEdit, setMultipleEdit] = useState({key: "", oldSuburb: "", newSuburb: "", oldStreet: "", newStreet: ""});
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
