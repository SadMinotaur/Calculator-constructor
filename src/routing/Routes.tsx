import React, { Suspense, FC } from "react";
import { Route, Switch } from "react-router-dom";
import SuspenseComponent from "@components/Suspense";

const Workspace = React.lazy(() => import("@src/pages/Workspace"));

const Routes: FC = () => (
  <Suspense fallback={<SuspenseComponent />}>
    <Switch>
      <Route component={Workspace} />
    </Switch>
  </Suspense>
);

export default Routes;
