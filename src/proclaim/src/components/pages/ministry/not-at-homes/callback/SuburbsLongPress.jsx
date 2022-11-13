import { useLongPress } from "../../../../../../../common/services/other/useLongPress";
import {
  PageContext,
  MultipleEditContext,
} from "../../../../../services/context/notAtHomesContext";
import { useContext} from "react";

export const SuburbsLongPress = ({ suburb }) => {
  const { page, setPage } = useContext(PageContext);
  const { multipleEdit, setMultipleEdit } = useContext(MultipleEditContext);

  const onLongPress = () => {
    setMultipleEdit({
      key: "suburb",
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
    <div className="pl-2 my-1 " {...longPressEvent}>
      {suburb}
    </div>
  );
};
