import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import { draggingStyles, CalculatorElementsProps } from "@utils/dndUtils";
import { useSortable } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { appendValue, setNextDot } from "@store/monitor";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const NumbersBlock: React.FC<CalculatorElementsProps> = ({
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

  function onClickDigits(val: number): void {
    if (runtime) dispatch(appendValue(val.toString()));
  }

  function onClickDot(): void {
    if (runtime) dispatch(setNextDot(true));
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
      {[...Array(9)].map((_, i) => {
        const num = 9 - i;
        return (
          <Button key={num} color='white' buttonValue={num} onClick={onClickDigits}>
            {num}
          </Button>
        );
      })}
      <Button color='white' buttonValue={0} className={cnb("zero")} onClick={onClickDigits}>
        0
      </Button>
      <Button color='white' buttonValue='dot' className={cnb("dot")} onClick={onClickDot}>
        ,
      </Button>
    </div>
  );
};

export default NumbersBlock;
