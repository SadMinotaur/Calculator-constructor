import { Transform } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

export function draggingStyles(
  transform: Transform | null,
  isDragging?: boolean
): CSSProperties | undefined {
  return transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.2 : 1
      }
    : undefined;
}

export interface CalculatorElementsProps {
  readonly id: string;
  readonly blockDrag?: boolean;
  readonly isStatic?: boolean;
  readonly noBorder?: boolean;
  readonly runtime?: boolean;
}
