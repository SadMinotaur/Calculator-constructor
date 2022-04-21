import EqualitySign from "@components/CalculatorParts/EqualBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import React from "react";

interface Props {
  readonly array: string[];
  readonly monitorValue: string;
}

const RenderAreaElements: React.FC<Props> = ({ array, monitorValue }) => (
  <>
    {array.map((item) => {
      switch (item) {
        case "signs":
          return <SignsBlock key={`area-${item}`} />;
        case "monitor":
          return <MonitorBlock value={monitorValue} key={`area-${item}`} />;
        case "numbers":
          return <NumbersBlock key={`area-${item}`} />;
        case "equality":
          return <EqualitySign key={`area-${item}`} />;
        default:
          return null;
      }
    })}
  </>
);

export default RenderAreaElements;
