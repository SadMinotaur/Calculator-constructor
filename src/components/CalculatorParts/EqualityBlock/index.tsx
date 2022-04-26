import React from "react";
import Button from "@components/Button";
import { draggingStyles, CalculatorElementsProps } from "@utils/dndUtils";
import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { calculateResult } from "@store/monitor";

const EqualitySign: React.FC<CalculatorElementsProps> = ({ blockDrag, id, noBorder, isStatic }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    disabled: blockDrag
  });

  const dispatch = useDispatch();

  function buttonClick(): void {
    dispatch(calculateResult());
  }

  return (
    <div
      className={classNames(
        "blocksPadding",
        { cursorMove: isDragging },
        { staticElement: isStatic },
        { noBorder }
      )}
      ref={setNodeRef}
      style={draggingStyles(transform, isDragging)}
      {...listeners}
      {...attributes}
    >
      <Button color='blue' buttonValue='=' onClick={buttonClick}>
        =
      </Button>
    </div>
  );
};

export default EqualitySign;
