import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ColumnElement,
  ColumnsState,
  ComponentsTypes,
  ConstructorState,
  ElementState
} from "./types";

const initialState = {
  elementsColumn: [
    {
      state: ElementState.draggable,
      type: ComponentsTypes.monitor,
      id: `${ComponentsTypes.monitor} element`
    },
    {
      state: ElementState.draggable,
      type: ComponentsTypes.signs,
      id: `${ComponentsTypes.signs} element`
    },
    {
      state: ElementState.draggable,
      type: ComponentsTypes.numbers,
      id: `${ComponentsTypes.numbers} element`
    },
    {
      state: ElementState.draggable,
      type: ComponentsTypes.equality,
      id: `${ComponentsTypes.equality} element`
    }
  ],
  constructorColumn: [],
  constructorState: ConstructorState.constructor
} as ColumnsState;

function setAllElementsState(arr: ColumnElement[], state: ElementState): ColumnElement[] {
  return arr.map((item) => ({
    ...item,
    state
  }));
}

const columnsStateSlice = createSlice({
  name: "columnsState",
  initialState,
  reducers: {
    setConstructorColumsState(state, action: PayloadAction<ColumnElement[]>) {
      state.constructorColumn = action.payload;
    },
    appendToConstructorColumn(state, action: PayloadAction<ComponentsTypes>) {
      if (!state.constructorColumn.find((item) => item.type === action.payload)) {
        state.elementsColumn = state.elementsColumn.map((item) => ({
          ...item,
          state: item.type !== action.payload ? item.state : ElementState.static
        }));
        state.constructorColumn = state.constructorColumn.concat({
          state: ElementState.dragged,
          type: action.payload,
          id: `${action.payload} constructor`
        });
      }
    },
    removeFromConstructorColumn(state, action: PayloadAction<ComponentsTypes>) {
      state.constructorColumn = state.constructorColumn.filter(
        (item) => item.type !== action.payload
      );
      state.elementsColumn = state.elementsColumn.map((item) => ({
        ...item,
        state: item.type !== action.payload ? item.state : ElementState.draggable
      }));
    },
    setColumnsMode(state, action: PayloadAction<ConstructorState>) {
      if (action.payload === ConstructorState.runtime) {
        state.constructorColumn = setAllElementsState(
          state.constructorColumn,
          ElementState.runtime
        );
      }
      if (action.payload === ConstructorState.constructor) {
        state.constructorColumn = setAllElementsState(
          state.constructorColumn,
          ElementState.dragged
        );
      }
      state.constructorState = action.payload;
    }
  }
});

export const {
  setConstructorColumsState,
  appendToConstructorColumn,
  setColumnsMode,
  removeFromConstructorColumn
} = columnsStateSlice.actions;
export default columnsStateSlice.reducer;
