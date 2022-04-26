import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const monitorStateSlice = createSlice({
  name: "monitorState",
  initialState: { value: "0", savedValue: null, selectedSign: null } as {
    value: string;
    nextDot?: boolean;
    clearOnNextClick?: boolean;
    selectedSign: string | null;
    savedValue: null | number;
  },
  reducers: {
    appendValue(state, action: PayloadAction<string>) {
      if (state.clearOnNextClick) {
        state.value = "0";
        state.clearOnNextClick = false;
      }
      const parsed = Number.parseFloat(
        `${state.value}${state.nextDot ? "." : ""}${action.payload}`
      );
      state.value = parsed.toString();
      state.nextDot = false;
    },
    setNextDot(state, action: PayloadAction<boolean>) {
      state.nextDot = action.payload;
    },
    setSelectedSign(state, action: PayloadAction<string>) {
      if (!state.clearOnNextClick) {
        state.selectedSign = action.payload;
        state.savedValue = Number.parseFloat(state.value);
        state.value = "";
      }
    },
    calculateResult(state) {
      const currentNumber = Number.parseFloat(state.value);
      let result = 0;
      if (state.savedValue) {
        switch (state.selectedSign) {
          case "+":
            result = state.savedValue + currentNumber;
            break;
          case "-":
            result = state.savedValue - currentNumber;
            break;
          case "/":
            result = state.savedValue / currentNumber;
            break;
          case "x":
            result = state.savedValue * currentNumber;
            break;
          default:
            break;
        }
      }
      if (result === Infinity) {
        state.value = "Не определено";
      } else {
        state.value = result.toLocaleString("ru", { maximumFractionDigits: 7 }).replace(",", ".");
      }
      state.savedValue = null;
      state.nextDot = false;
      state.selectedSign = null;
      state.clearOnNextClick = true;
    }
  }
});

export const { setNextDot, appendValue, setSelectedSign, calculateResult } =
  monitorStateSlice.actions;
export default monitorStateSlice.reducer;
