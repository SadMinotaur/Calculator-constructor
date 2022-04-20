import { useDraggable } from "@dnd-kit/core";
import { draggingStyles, DragProps } from "@utils/dndUtils";
import classNames from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

interface Props extends DragProps {
  readonly value: string;
}

const MonitorBlock: React.FC<Props> = ({ value, blockDrag }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: "monitor",
    disabled: blockDrag
  });

  return (
    <div
      className={cnb("blocksPadding")}
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
