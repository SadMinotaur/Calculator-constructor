import EqualitySign from "@components/CalculatorParts/EqualityBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import { ColumnElement, ComponentsTypes, ElementState } from "@store/columns/types";
import React from "react";

interface Props {
  readonly elements: ColumnElement[];
  readonly monitorValue: string;
  readonly keyPostfix: string;
}

const RenderAreaElements: React.FC<Props> = ({ elements, monitorValue, keyPostfix }) => (
  <>
    {elements.map((el) => {
      const key = `${el.type} ${el.state}${keyPostfix}`;
      const isBlockedDrag = el.state === ElementState.static;

      switch (el.type) {
        case ComponentsTypes.signs:
          return <SignsBlock id={key} key={key} blockDrag={isBlockedDrag} />;
        case ComponentsTypes.monitor:
          return <MonitorBlock id={key} key={key} blockDrag={isBlockedDrag} value={monitorValue} />;
        case ComponentsTypes.numbers:
          return <NumbersBlock id={key} key={key} blockDrag={isBlockedDrag} />;
        case ComponentsTypes.equality:
          return <EqualitySign id={key} key={key} blockDrag={isBlockedDrag} />;
        default:
          return null;
      }
    })}
  </>
);

export default RenderAreaElements;
