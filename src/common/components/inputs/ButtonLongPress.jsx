import { useLongPress } from "../../../common/services/other/useLongPress.js";
import { Button } from "./Button";

export const ButtonLongPress = ({ action, children }) => {
  const onLongPress = () => {
    action();
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
    <div {...longPressEvent}>
      <Button>{children}</Button>
    </div>
  );
};
