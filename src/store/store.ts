import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import user from "./user/userRedusers";

const reducers = combineReducers({
  user
});

export type RootState = ReturnType<typeof reducers>;
const persistedReducer = persistReducer(
  {
    key: "root",
    storage
  },
  reducers
);
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));
export const persistor = persistStore(store);
