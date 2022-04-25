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
  const isBlockedDrag = el.state === ElementState.static;

  switch (el.type) {
    case ComponentsTypes.signs:
      return <SignsBlock id={el.id} blockDrag={isBlockedDrag} />;
    case ComponentsTypes.monitor:
      return <MonitorBlock id={el.id} blockDrag={isBlockedDrag} />;
    case ComponentsTypes.numbers:
      return <NumbersBlock id={el.id} blockDrag={isBlockedDrag} />;
    case ComponentsTypes.equality:
      return <EqualitySign id={el.id} blockDrag={isBlockedDrag} />;
    default:
      return null;
  }
};

export default RenderElement;
