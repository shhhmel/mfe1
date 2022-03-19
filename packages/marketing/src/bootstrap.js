import React from "react";
import ReactDOM from "react-dom";

const mount = (el) => {
  ReactDOM.render(<h1>Hi from Marketing</h1>, el);
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_marketing-dev-root");

  if (el) {
    mount(el);
  }
}

export { mount };
