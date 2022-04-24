import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const monitorStateSlice = createSlice({
  name: "monitorState",
  initialState: { value: "0" } as {
    value: string;
  },
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
