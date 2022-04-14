import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import storage from "redux-persist/lib/storage";
import user from "./user/userRedusers";
import rootSaga from "./rootSaga";

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
const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
