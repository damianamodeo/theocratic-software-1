import { useState } from "react";
import { Streets } from "./streets";

export const Suburbs = ({ addresses }) => {
  const [active, setActive] = useState("");
  return (
    <div className="">
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
      ].map(function (suburb) {
        if (!suburb) return;
        return (
          <div key={suburb}>
            <div
              className="text-primary font-bold text-3xl pb-4 text-center"
              onClick={() =>
                active === suburb ? setActive("") : setActive(suburb)
              }
            >
              {suburb} 
                <span className="text-black font-normal px-2 py-4 text-sm text-left">{" - "}
              {
                Object.keys(
                  Object.fromEntries(
                    Object.entries(addresses).filter(
                      ([key, address]) => address.suburb === suburb && !address.letter
                    )
                  )
                ).length
              } </span>
            </div>
            <div className={`${active === suburb ? "visible" : "hidden"}`}>
              <Streets suburb={suburb} addresses={addresses} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
