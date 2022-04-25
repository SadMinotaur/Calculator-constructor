import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnsState, ComponentsTypes, ConstructorState, ElementState } from "./types";

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

const columnsStateSlice = createSlice({
  name: "columnsState",
  initialState,
  reducers: {
    appendToConstructorColumn(state, action: PayloadAction<ComponentsTypes>) {
      if (!state.constructorColumn.find((item) => item.type === action.payload)) {
        state.elementsColumn = state.elementsColumn.map((item) => ({
          ...item,
          state: item.type !== action.payload ? item.state : ElementState.static
        }));
        state.constructorColumn = state.constructorColumn.concat({
          state: ElementState.draggable,
          type: action.payload,
          id: `${action.payload} constructor`
        });
      }
    },
    setAllColumsState(state, action: PayloadAction<ColumnsState>) {
      state = action.payload;
    },
    setChangeMode(state, action: PayloadAction<ConstructorState>) {
      if (action.payload === ConstructorState.runtime) {
        state.elementsColumn = state.elementsColumn.map((item) => ({
          ...item,
          state: ElementState.static
        }));
        state.constructorColumn = state.constructorColumn.map((item) => ({
          ...item,
          state: ElementState.static
        }));
      }
      // if (action.payload === ConstructorState.runtime) {
      // }
      state.constructorState = action.payload;
    }
  }
});

export const { setAllColumsState, appendToConstructorColumn, setChangeMode } =
  columnsStateSlice.actions;
export default columnsStateSlice.reducer;
