import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";
import { observables } from "./core/observable.hooks";

const mount = (el, { defaultHistory, initialPath, onSignIn }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onUnmount: () => {
      console.log("onUnmount");
      // subscribers["host:navigate"].forEach((subscriber) => {
      //   hostNavigateObservable.unsubscribe(subscriber);
      // });
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_auth-dev-root");

  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
