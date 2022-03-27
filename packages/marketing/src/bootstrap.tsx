import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// @ts-ignore
import { createMemoryHistory, createBrowserHistory } from "history";
import reportWebVitals from "./reportWebVitals";

const mount = (
  el: Element,
  { onNavigate, defaultHistory, initialPath }: any
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

  return {
    onParentNavigate: ({ pathname: nextPathname }: any) => {
      const location = history.location;

      if (location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_marketing-dev-root");

  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
