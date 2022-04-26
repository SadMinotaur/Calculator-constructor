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
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import DroppableArea from "@components/CalculatorParts/DroppableArea/DroppableArea";
import ImageSvg from "@src/svgr/image";
import {
  appendToConstructorColumn,
  setColumnsMode,
  setConstructorColumsState,
  removeFromConstructorColumn
} from "@store/columns";
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
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import RenderAreaElements from "./RenderAreaElements";
import RenderElement from "./RenderElement";

const cnb = classNames.bind(styles);

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns);
  const areaNotEmpty: boolean = columns.constructorColumn.length > 0;
  const sortableContexItems = columns.constructorColumn.map((el) => el.id);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [lastTouched, setLastTouched] = React.useState<string | null>(null);

  function stateSwitch(tab: ConstructorState): void {
    dispatch(setColumnsMode(tab));
  }

  function idParse(id: string): ComponentsTypes | null {
    const type = id.split(" ")?.[0];
    return isInEnumTypeGuard(ComponentsTypes, type) ? type : null;
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragEnd(e: DragEndEvent): void {
    if (e.over?.id === e.active.id) {
      if (lastTouched === e.active.id) {
        const type = idParse(lastTouched);
        if (type) dispatch(removeFromConstructorColumn(type));
      }
      setLastTouched(e.active.id);
    } else {
      const type = idParse(e.active.id);
      const overIdSplitted = e.over?.id.split(" ");
      const oldIndex = columns.constructorColumn.findIndex((item) => item.id === e.active.id);
      if (overIdSplitted?.[0] === "area" && overIdSplitted?.[1] === "constructor") {
        if (type) dispatch(appendToConstructorColumn(type));
      }
      if (
        oldIndex !== -1 &&
        overIdSplitted?.[1] === "constructor" &&
        idParse(overIdSplitted?.[0])
      ) {
        const newIndex = columns.constructorColumn.findIndex((item) => item.id === e.over?.id);
        dispatch(
          setConstructorColumsState(arrayMove(columns.constructorColumn, oldIndex, newIndex))
        );
      }
      setActiveId(null);
    }
  }

  function handleDragStart(event: DragStartEvent): void {
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
          <SortableContext items={sortableContexItems} strategy={verticalListSortingStrategy}>
            <DroppableArea itemsInside={columns.constructorColumn.length}>
              {areaNotEmpty ? (
                <RenderAreaElements elements={columns.constructorColumn} />
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
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default Workspace;
