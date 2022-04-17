import React from "react";
import { DndContext } from "@dnd-kit/core";
import Button from "@components/Button";
import StateSwitch from "@components/StateSwitch";
import EqualSign from "@components/CalculatorParts/EqualSign";
// import { Draggable } from "./Draggable";

const Workspace: React.FC = () => {
  return (
    <div>
      <EqualSign />
    </div>
  );
};

export default Workspace;
