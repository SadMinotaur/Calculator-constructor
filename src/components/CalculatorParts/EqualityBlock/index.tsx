import React from "react";
import Button from "@components/Button";
import { useDraggable } from "@dnd-kit/core";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import classNames from "classnames";

const EqualitySign: React.FC<DragProps> = ({ blockDrag, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: blockDrag
  });

  return (
    <div
      className={classNames(
        "blocksPadding",
        { cursorMove: isDragging },
        { staticElement: blockDrag }
      )}
      ref={setNodeRef}
      style={draggingStyles(transform, isDragging)}
      {...listeners}
      {...attributes}
    >
      <Button color='blue' buttonValue='='>
        =
      </Button>
    </div>
  );
};

export default EqualitySign;
