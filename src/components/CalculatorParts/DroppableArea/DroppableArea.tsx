import React from "react";
import classNames from "classnames/bind";
import { useDroppable } from "@dnd-kit/core";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

interface Props {
  readonly hasElements?: boolean;
}

const DroppableArea: React.FC<Props> = ({ children, hasElements }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "area constructor"
  });

  const style = {
    background: !hasElements && isOver ? "#F0F9FF" : undefined
  };

  return (
    <div className={cnb("area", { filled: hasElements })} ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default DroppableArea;
