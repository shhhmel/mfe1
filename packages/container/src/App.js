import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const MarketingApp = React.lazy(() => import("./components/MarketingApp"));
const AuthApp = React.lazy(() => import("./components/AuthApp"));

import Header from "./components/Header";
import Progress from "./components/Progress";

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
