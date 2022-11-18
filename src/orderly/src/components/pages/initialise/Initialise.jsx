import { useState } from "react";
import { WelcomePage } from "./WelcomePage";
import { EnterPersonalDetails } from "./personal/EnterPersonalDetails";
import { LoadPersonalDetails } from "./personal/LoadPersonalDetails";
import { AddCongregation } from "./congregation-details/AddCongregation";
import { EnterCongregationDetails } from "./congregation-details/EnterCongregationDetails";
import { LoadCongregationDetails } from "./congregation-details/LoadCongregationDetails";


export const Initialise = () => {
  const [page, setPage] = useState(`WelcomePage`)
  
  if (page === "AddPersonalDetails") {
    return <EnterPersonalDetails setPage={setPage}></EnterPersonalDetails>;
  }
  if (page === "LoadPersonalDetails") {
    return <LoadPersonalDetails setPage={setPage}></LoadPersonalDetails>;
  }
  if (page === "AddCongregation") {
    return <AddCongregation setPage={setPage}></AddCongregation>;
  }
  if (page === "EnterCongregationDetails") {
    return <EnterCongregationDetails setPage={setPage}></EnterCongregationDetails>;
  }
  if (page === "LoadCongregationDetails") {
    return <LoadCongregation setPage={setPage}></LoadCongregation>;
  }
  return (
    <>
      <WelcomePage setPage={setPage}></WelcomePage>
    </>
  );
};
