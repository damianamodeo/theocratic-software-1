import { useContext, useState } from "react";
import { Streets } from "./Streets";
import {
  PageContext,
  MultipleEditContext,
} from "../../../../services/context/notAtHomesContext";

export const CallBackList = ({ addresses }) => {
  const [active, setActive] = useState("");
  const { page, setPage } = useContext(PageContext);
  const { multipleEdit, setMultipleEdit } = useContext(MultipleEditContext);

  return (
    <>
      {[
        ...new Set(
          Object.keys(
            Object.fromEntries(
              Object.entries(addresses).filter(
                ([key, address]) => !address.letter
              )
            )
          )
            .sort(function (a, b) {
              return addresses[a].suburb > addresses[b].suburb ? 1 : -1;
            })
            .filter((id) => true)
            .map((key) => addresses[key].suburb)
        ),
      ].map((suburb) => {
        if (!suburb) return;
        return (
          <div key={suburb}>
            <div className="text-secondary font-bold text-xl text-center ">
              <div className="flex flex-col border">
                <div className="flex">
                  <div className="pl-2 my-1 ">{suburb}</div>

                  {active === suburb ? (
                    <div
                      className={`text-black font-normal pl-2 text-sm my-auto text-right underline`}
                      onClick={() => {
                        setMultipleEdit({key: "suburb", oldValue: suburb, newValue: suburb})
                        setPage("MultipleEdit");
                      }}
                    >
                      edit
                    </div>
                  ) : (
                    <div
                      className={`text-black font-normal px-2 text-sm my-auto text-right`}
                    >
                      {`(${
                        Object.keys(
                          Object.fromEntries(
                            Object.entries(addresses).filter(
                              ([key, address]) =>
                                address.suburb === suburb && !address.letter
                            )
                          )
                        ).length
                      })`}
                    </div>
                  )}
                  <div
                    className="ml-auto px-4 my-auto"
                    onClick={() =>
                      active === suburb ? setActive("") : setActive(suburb)
                    }
                  >
                    {`${active === suburb ? "\u2212" : "\u002B"}`}
                  </div>
                </div>
                <div className={`${active === suburb ? "visible" : "hidden"}`}>
                  <Streets suburb={suburb} addresses={addresses} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
