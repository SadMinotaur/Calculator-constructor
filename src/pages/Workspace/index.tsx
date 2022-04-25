import React from "react";
import StateSwitch from "@components/StateSwitch";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import DroppableArea from "@components/CalculatorParts/DroppableArea/DroppableArea";
import ImageSvg from "@src/svgr/image";
import { appendToConstructorColumn, setChangeMode } from "@store/columns";
import {
  isInEnumTypeGuard,
  ComponentsTypes,
  ConstructorState,
  ElementState
} from "@store/columns/types";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  rectSwappingStrategy,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import RenderAreaElements from "./RenderAreaElements";
import RenderElement from "./RenderElement";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns);
  const areaNotEmpty: boolean = columns.constructorColumn.length > 0;
  const sortableContexItems = columns.constructorColumn.map((el) => el.id);

  function stateSwitch(tab: ConstructorState): void {
    dispatch(setChangeMode(tab));
  }

  function idParse(id: string): ComponentsTypes | null {
    const type = id.split(" ")?.[0];
    return isInEnumTypeGuard(ComponentsTypes, type) ? type : null;
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  );

  function handleDragEnd(event: DragEndEvent): void {
    const isOverConstructor = event.over?.id.split(" ")?.[1] === "constructor";
    if (isOverConstructor && event.active.id) {
      const type = idParse(event.active.id);
      if (type) dispatch(appendToConstructorColumn(type));
    }
    setActiveId(null);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
  }

  const RenderOverlay = () => {
    const type: ComponentsTypes | null = activeId ? idParse(activeId) : null;
    return (
      <DragOverlay>
        {activeId && type ? (
          <RenderElement el={{ id: activeId, state: ElementState.static, type }} />
        ) : null}
      </DragOverlay>
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className={cnb("container")}>
        <div className={cnb("elements")}>
          <div className={cnb("box")}>
            <RenderAreaElements elements={columns.elementsColumn} />
          </div>
        </div>
        <div className={cnb("controls")}>
          <StateSwitch active={columns.constructorState} onClick={stateSwitch} />
        </div>
        <div className={cnb("dropArea")}>
          <DroppableArea hasElements={areaNotEmpty}>
            {areaNotEmpty ? (
              <SortableContext items={sortableContexItems} strategy={verticalListSortingStrategy}>
                <RenderAreaElements elements={columns.constructorColumn} />
              </SortableContext>
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
          <RenderOverlay />
        </div>
      </div>
    </DndContext>
  );
};

export default Workspace;
