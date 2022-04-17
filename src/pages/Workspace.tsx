import React from "react";
import { DndContext } from "@dnd-kit/core";
import Button from "@components/Button";
import StateSwitch from "@components/StateSwitch";
// import { Draggable } from "./Draggable";

const Workspace: React.FC = () => {
  return (
    <div>
      <Button color='white'>1</Button>
      <StateSwitch active='constructor' />
    </div>
  );
};

export default Workspace;
