import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import HostObservables from "./core/host-observables";
import Header from "./components/Header";
import Progress from "./components/Progress";
import AsyncLoader from "./components/AsyncLoader";

const DashboardApp = React.lazy(() => import("./components/DashboardApp"));
const MarketingApp = React.lazy(() => import("./components/MarketingApp"));
const AuthApp = React.lazy(() => import("./components/AuthApp"));
const UsersCollectionLazy = React.lazy(
  () => import("marketing/UsersCollection")
);

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <HostObservables />
      <div>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AsyncLoader>
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </AsyncLoader>
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <AsyncLoader>
                <DashboardApp />
              </AsyncLoader>
            </Route>
            <Route path="/users">
              <>
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  This is heading from Host.
                </h1>
                <AsyncLoader>
                  <UsersCollectionLazy name={"Users collection"} />
                </AsyncLoader>
              </>
            </Route>
            <Route path="/">
              <AsyncLoader>
                <MarketingApp />
              </AsyncLoader>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
