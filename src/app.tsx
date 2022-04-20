import React from "react";
import { persistor, store } from "@store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import SuspenseComponent from "@components/Suspense";
import Routes from "./routing/Routes";

const App = (): React.ReactElement => (
  <Provider store={store}>
    <PersistGate loading={<SuspenseComponent />} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
