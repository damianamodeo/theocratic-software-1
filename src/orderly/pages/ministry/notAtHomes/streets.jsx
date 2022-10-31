import { useState } from "react";
import { HouseNumbers } from "./houseNumbers";

export const Streets = ({ suburb, addresses }) => {
  const [active, setActive] = useState("");
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
              // .filter((id) => addresses[id].letter === true)
              .map((id) => addresses[id].street)
          ),
        ].map(function (street) {
          return (
            <div
              key={street}
              className="text-black font-normal px-2 py-4 text-2xl text-left"
            >
              <div
                onClick={() =>
                  active === street ? setActive("") : setActive(street)
                }
              >
                {street}
                <span className="text-black font-normal px-2 py-4 text-sm text-left">
                  {"- "}
                  {
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
                  }
                </span>
              </div>
              <div className={`${active === street ? "visible" : "hidden"}`}>
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
