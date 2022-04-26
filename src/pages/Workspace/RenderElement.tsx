import EqualitySign from "@components/CalculatorParts/EqualityBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import { ColumnElement, ComponentsTypes, ElementState } from "@store/columns/types";
import React from "react";

interface Props {
  el: ColumnElement;
}

const RenderElement: React.FC<Props> = ({ el }): JSX.Element | null => {
  const isRuntime = el.state === ElementState.runtime;
  const isStatic = el.state === ElementState.static;
  const isBlockedDrag = el.state === ElementState.static || el.state === ElementState.runtime;
  const noBorder = el.state === ElementState.dragged || el.state === ElementState.runtime;

  switch (el.type) {
    case ComponentsTypes.signs:
      return (
        <SignsBlock
          id={el.id}
          blockDrag={isBlockedDrag}
          isStatic={isStatic}
          noBorder={noBorder}
          runtime={isRuntime}
        />
      );
    case ComponentsTypes.monitor:
      return (
        <MonitorBlock
          id={el.id}
          blockDrag={isBlockedDrag}
          isStatic={isStatic}
          noBorder={noBorder}
          runtime={isRuntime}
        />
      );
    case ComponentsTypes.numbers:
      return (
        <NumbersBlock
          id={el.id}
          blockDrag={isBlockedDrag}
          isStatic={isStatic}
          noBorder={noBorder}
          runtime={isRuntime}
        />
      );
    case ComponentsTypes.equality:
      return (
        <EqualitySign
          id={el.id}
          blockDrag={isBlockedDrag}
          isStatic={isStatic}
          noBorder={noBorder}
          runtime={isRuntime}
        />
      );
    default:
      return null;
  }
};

export default RenderElement;
