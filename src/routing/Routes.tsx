import React, { Suspense, FC } from "react";
import { Route, Switch } from "react-router-dom";
import SuspenseComponent from "@components/common/suspense";

const Workspace = React.lazy(() => import("@src/pages/Workspace"));

const Routes: FC = () => (
  <Suspense fallback={<SuspenseComponent />}>
    <Switch>
      <Route path='/' component={Workspace} />
    </Switch>
  </Suspense>
);

export default Routes;
