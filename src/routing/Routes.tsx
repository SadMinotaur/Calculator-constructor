import React, { Suspense, FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { store } from "@store/store";
import SuspenseComponent from "@components/common/suspense";

const Login = React.lazy(() => import("@src/pages/Login"));
const Workspace = React.lazy(() => import("@src/pages/Workspace"));

const Routes: FC = () => (
  <Suspense fallback={<SuspenseComponent />}>
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route
        path='/'
        component={() => (store.getState().user.token ? <Workspace /> : <Redirect to='/login' />)}
      />
    </Switch>
  </Suspense>
);

export default Routes;
