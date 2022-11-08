import { useLongPress } from "../../../../../../common/services/other/useLongPress";
import {
  PageContext,
  MultipleEditContext,
} from "../../../../services/context/notAtHomesContext";
import { useContext} from "react";

export const StreetsLongPress = ({ suburb, street }) => {
  const { page, setPage } = useContext(PageContext);
  const { multipleEdit, setMultipleEdit } = useContext(MultipleEditContext);

  const onLongPress = () => {
    setMultipleEdit({
      key: "street",
      oldStreet: street,
      newStreet: street,
      oldSuburb: suburb,
      newSuburb: suburb,
    });
    setPage("MultipleEdit");
  };

  const onClick = () => {
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  return (
    <div className="text-sm px-2 my-auto " {...longPressEvent}>
      {street}
    </div>
  );
};
