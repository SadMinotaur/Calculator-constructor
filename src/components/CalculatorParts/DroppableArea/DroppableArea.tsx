import React from "react";
import classNames from "classnames/bind";
import { useDroppable } from "@dnd-kit/core";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

interface Props {
  readonly itemsInside: number;
}

const DroppableArea: React.FC<Props> = ({ children, itemsInside }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "area constructor"
  });
  const hasElements = itemsInside > 0;
  const showLine = itemsInside > 0 && itemsInside < 4 && isOver;

  const style = {
    background: !hasElements && isOver ? "#F0F9FF" : undefined
  };

  return (
    <div className={cnb("area", { filled: hasElements })} ref={setNodeRef} style={style}>
      {children}
      {showLine && <div className={cnb("line")} />}
    </div>
  );
};

export default DroppableArea;
