import { useSortable } from "@dnd-kit/sortable";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

interface Props extends DragProps {
  readonly value?: string;
}

const MonitorBlock: React.FC<Props> = ({ value = "0", blockDrag, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    disabled: blockDrag
  });

  return (
    <div
      className={cnb("blocksPadding", { cursorMove: isDragging }, { staticElement: blockDrag })}
      ref={setNodeRef}
      style={draggingStyles(transform, isDragging)}
      {...listeners}
      {...attributes}
    >
      <input className={cnb("input")} value={value} type='number' disabled />
    </div>
  );
};

export default MonitorBlock;
