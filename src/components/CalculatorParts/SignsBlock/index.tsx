import React from "react";
import classNames from "classnames/bind";
import Button from "@components/Button";
import { useSortable } from "@dnd-kit/sortable";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const SignsBlock: React.FC<DragProps> = ({ blockDrag, id }) => {
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
      <Button color='white' buttonValue='/'>
        /
      </Button>
      <Button color='white' buttonValue='x'>
        x
      </Button>
      <Button color='white' buttonValue='-'>
        -
      </Button>
      <Button color='white' buttonValue='+'>
        +
      </Button>
    </div>
  );
};

export default SignsBlock;
