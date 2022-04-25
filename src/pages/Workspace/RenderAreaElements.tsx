import { ColumnElement } from "@store/columns/types";
import React from "react";
import RenderElement from "./RenderElement";

interface Props {
  readonly elements: ColumnElement[];
}

const RenderAreaElements: React.FC<Props> = ({ elements }) => (
  <>
    {elements.map((el) => (
      <RenderElement el={el} key={el.id} />
    ))}
  </>
);

export default RenderAreaElements;
