import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MonitorState {
  value: string;
}

const initialState = { value: "0" } as MonitorState;

const monitorStateSlice = createSlice({
  name: "monitorState",
  initialState,
  reducers: {
    appendValue(state, action: PayloadAction<string>) {
      state.value += action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
});

export const { setValue, appendValue } = monitorStateSlice.actions;
export default monitorStateSlice.reducer;
