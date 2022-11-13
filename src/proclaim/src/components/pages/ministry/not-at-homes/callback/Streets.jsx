import { useState, useContext } from "react";
import { HouseNumbers } from "./HouseNumbers";
import {
  PageContext,
  MultipleEditContext,
} from "../../../../../services/context/notAtHomesContext";
import { StreetsLongPress } from "./StreetsLongPress";

export const Streets = ({ suburb, addresses }) => {
  const [active, setActive] = useState({});
  const { page, setPage } = useContext(PageContext);
  const { multipleEdit, setMultipleEdit } = useContext(MultipleEditContext);

  return (
    <div>
      <div>
        {[
          ...new Set(
            Object.keys(
              Object.fromEntries(
                Object.entries(addresses).filter(
                  ([key, value]) => !value.letter
                )
              )
            )
              .sort(function (a, b) {
                return addresses[a].street > addresses[b].street ? 1 : -1;
              })
              .filter((id) => addresses[id].suburb === suburb)
              .map((id) => addresses[id].street)
          ),
        ].map(function (street) {
          return (
            <div key={street}>
              <div
                key={street}
                className="text-black font-normal text-sm flex my-2"
              >
                <StreetsLongPress suburb={suburb} street={street} />

                {active[street] === true ? null : (
                  <div className="text-black font-normal text-left my-auto">
                    {`(${
                      Object.keys(
                        Object.fromEntries(
                          Object.entries(addresses).filter(
                            ([key, address]) =>
                              address.suburb === suburb &&
                              address.street === street &&
                              !address.letter
                          )
                        )
                      ).length
                    })`}
                  </div>
                )}
                <div
                  className="ml-auto px-4 my-auto text-lg"
                  onClick={() => {
                    const activeStreets = { ...active };
                    activeStreets[street] =
                      active[street] === true ? false : true;
                    setActive(activeStreets);
                  }}
                >
                  {`${active[street] === true ? "\u2212" : "\u002B"}`}
                </div>
              </div>
              <div
                className={`${active[street] === true ? "visible" : "hidden"} `}
              >
                <HouseNumbers
                  suburb={suburb}
                  street={street}
                  addresses={addresses}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
