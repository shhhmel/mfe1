import React, { Suspense, useState, useEffect } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";
import ErrorBoundary from "./components/ErrorBoundary";

const DashboardApp = React.lazy(() => import("./components/DashboardApp"));
const MarketingApp = React.lazy(() => import("./components/MarketingApp"));
const AuthApp = React.lazy(() => import("./components/AuthApp"));

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
      <div>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />

        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <ErrorBoundary>
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </ErrorBoundary>
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <ErrorBoundary>
                <DashboardApp />
              </ErrorBoundary>
            </Route>
            <Route path="/">
              <ErrorBoundary>
                <MarketingApp />
              </ErrorBoundary>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
