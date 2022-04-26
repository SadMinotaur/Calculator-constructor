import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import { useSortable } from "@dnd-kit/sortable";
import { draggingStyles, CalculatorElementsProps } from "@utils/dndUtils";
import { useDispatch } from "react-redux";
import { setSelectedSign } from "@store/monitor";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const ButtonsArray: string[] = ["/", "x", "-", "+"];

const SignsBlock: React.FC<CalculatorElementsProps> = ({
  blockDrag,
  id,
  noBorder,
  isStatic,
  runtime
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    disabled: blockDrag
  });

  const dispatch = useDispatch();

  function onSignClick(val: string): void {
    if (runtime) dispatch(setSelectedSign(val));
  }

  return (
    <div
      className={cnb(
        "blocksPadding",
        "wrapper",
        { cursorMove: isDragging },
        { staticElement: isStatic },
        { noBorder }
      )}
      ref={setNodeRef}
      style={draggingStyles(transform, isDragging)}
      {...listeners}
      {...attributes}
    >
      {ButtonsArray.map((item) => (
        <Button color='white' buttonValue={item} key={item} onClick={onSignClick}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default SignsBlock;
