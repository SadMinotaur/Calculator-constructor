import React from "react";
import Button from "@components/Button";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";

const EqualitySign: React.FC<DragProps> = ({ blockDrag, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
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
