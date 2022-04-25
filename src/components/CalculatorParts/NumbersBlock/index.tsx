import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import { useSortable } from "@dnd-kit/sortable";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const NumbersBlock: React.FC<DragProps> = ({ blockDrag, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    disabled: blockDrag
  });

  return (
    <div
      className={cnb(
        "blocksPadding",
        "wrapper",
        { cursorMove: isDragging },
        { staticElement: blockDrag }
      )}
      ref={setNodeRef}
      style={draggingStyles(transform, isDragging)}
      {...listeners}
      {...attributes}
    >
      {[...Array(9)].map((_, i) => (
        <Button key={9 - i} color='white' buttonValue={9 - i}>
          {9 - i}
        </Button>
      ))}
      <Button color='white' buttonValue={0} className={cnb("zero")}>
        0
      </Button>
      <Button color='white' buttonValue='dot' className={cnb("dot")}>
        ,
      </Button>
    </div>
  );
};

export default NumbersBlock;
