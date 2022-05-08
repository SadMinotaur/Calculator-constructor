import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import monitor from "./monitor";
import columns from "./columns";

const reducers = combineReducers({
  monitor,
  columns
});

export type RootState = ReturnType<typeof reducers>;
const persistedReducer = persistReducer(
  {
    key: "root",
    // whitelist: [],
    storage
  },
  reducers
);
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));
export const persistor = persistStore(store);
