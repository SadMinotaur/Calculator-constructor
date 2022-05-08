import React from "react";
import { persistor, store } from "@store/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import SuspenseComponent from "@components/Suspense";
import Routes from "./routing/Routes";

import "./styles/global.scss";

const App = (): React.ReactElement => (
  <Provider store={store}>
    <PersistGate loading={<SuspenseComponent />} persistor={persistor}>
      <HashRouter basename='/'>
        <Routes />
      </HashRouter>
    </PersistGate>
  </Provider>
);

export default App;
