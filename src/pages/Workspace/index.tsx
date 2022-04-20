import React from "react";
import StateSwitch from "@components/StateSwitch";
import EqualitySign from "@components/CalculatorParts/EqualBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DroppableArea from "@components/CalculatorParts/DroppableArea/DroppableArea";
import ImageSvg from "@src/svgr/image";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  const [parent, setParent] = React.useState<string | null>(null);

  function handleDragEnd({ over }: DragEndEvent): void {
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={cnb("container")}>
        <div className={cnb("elements")}>
          <div className={cnb("box")}>
            <MonitorBlock value='0' />
            <SignsBlock />
            <NumbersBlock />
            {!parent && <EqualitySign />}
          </div>
        </div>
        <div className={cnb("controls")}>
          <StateSwitch active='constructor' />
        </div>
        <div className={cnb("dropArea")}>
          <DroppableArea>
            {parent ? (
              <EqualitySign />
            ) : (
              <div className={cnb("desc")}>
                <ImageSvg />
                <h6>Перетащите сюда</h6>
                <p>
                  любой элемент
                  <br /> из левой панели
                </p>
              </div>
            )}
          </DroppableArea>
        </div>
      </div>
    </DndContext>
  );
};

export default Workspace;
