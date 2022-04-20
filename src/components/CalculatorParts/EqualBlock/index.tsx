import React from "react";
import Button from "@components/Button";
import { useDraggable } from "@dnd-kit/core";
import { draggingStyles, DragProps } from "@utils/dndUtils";

const EqualitySign: React.FC<DragProps> = ({ blockDrag }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: "equality",
    disabled: blockDrag
  });

  return (
    <div
      className='blocksPadding'
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
