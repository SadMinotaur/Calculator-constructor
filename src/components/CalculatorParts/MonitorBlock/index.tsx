import { useSortable } from "@dnd-kit/sortable";
import { draggingStyles, CalculatorElementsProps } from "@utils/dndUtils";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const MonitorBlock: React.FC<CalculatorElementsProps> = ({ blockDrag, id, noBorder, isStatic }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    disabled: blockDrag
  });

  const monitor = useSelector((state: RootState) => state.monitor);

  return (
    <div
      className={cnb(
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
      <input
        className={cnb("input", { smallFont: monitor.value.length > 8 })}
        value={monitor.value}
        type='text'
        disabled
      />
    </div>
  );
};

export default MonitorBlock;
