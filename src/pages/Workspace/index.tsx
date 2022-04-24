import React from "react";
import StateSwitch from "@components/StateSwitch";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import DroppableArea from "@components/CalculatorParts/DroppableArea/DroppableArea";
import ImageSvg from "@src/svgr/image";
import { appendToConstructorColumn, setChangeMode } from "@store/columns";
import { isInEnumTypeGuard, ComponentsTypes, ConstructorState } from "@store/columns/types";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import RenderAreaElements from "./RenderAreaElements";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const monitor = useSelector((state: RootState) => state.monitor);
  const columns = useSelector((state: RootState) => state.columns);

  const areaNotEmpty: boolean = columns.constructorColumn.length > 0;

  function handleDragEnd({ over, active }: DragEndEvent): void {
    if (over?.id === "area" && active.id) {
      const elementType = active.id.split(" ")[0];
      if (isInEnumTypeGuard(ComponentsTypes, elementType)) {
        dispatch(appendToConstructorColumn(elementType));
      }
    }
  }

  function stateSwitch(tab: ConstructorState): void {
    dispatch(setChangeMode(tab));
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={cnb("container")}>
        <div className={cnb("elements")}>
          <div className={cnb("box")}>
            <RenderAreaElements
              elements={columns.elementsColumn}
              monitorValue={monitor.value}
              keyPostfix='elements'
            />
          </div>
        </div>
        <div className={cnb("controls")}>
          <StateSwitch active={columns.constructorState} onClick={stateSwitch} />
        </div>
        <div className={cnb("dropArea")}>
          <DroppableArea hasElements={areaNotEmpty}>
            {areaNotEmpty ? (
              <RenderAreaElements
                elements={columns.constructorColumn}
                monitorValue={monitor.value}
                keyPostfix='constructor'
              />
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
