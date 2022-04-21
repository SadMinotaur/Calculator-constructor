import React from "react";
import StateSwitch from "@components/StateSwitch";
import EqualitySign from "@components/CalculatorParts/EqualBlock";
import SignsBlock from "@components/CalculatorParts/SignsBlock";
import NumbersBlock from "@components/CalculatorParts/NumbersBlock";
import MonitorBlock from "@components/CalculatorParts/MonitorBlock";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import DroppableArea from "@components/CalculatorParts/DroppableArea/DroppableArea";
import ImageSvg from "@src/svgr/image";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import RenderAreaElements from "./RenderAreaElements";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  const monitor = useSelector((state: RootState) => state.monitor);
  const [parent, setParent] = React.useState<string[]>([]);

  function handleDragEnd({ over, active }: DragEndEvent): void {
    if (over?.id === "area" && active.id) {
      setParent(Array.from(new Set([...parent, active.id])));
    }
  }

  const areaNotEmpty = parent.length > 0;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={cnb("container")}>
        <div className={cnb("elements")}>
          <div className={cnb("box")}>
            <MonitorBlock value={monitor.value} />
            <SignsBlock />
            <NumbersBlock />
            <EqualitySign />
          </div>
        </div>
        <div className={cnb("controls")}>
          <StateSwitch active='constructor' />
        </div>
        <div className={cnb("dropArea")}>
          <DroppableArea hasElements={areaNotEmpty}>
            {areaNotEmpty ? (
              <RenderAreaElements array={parent} monitorValue={monitor.value} />
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
