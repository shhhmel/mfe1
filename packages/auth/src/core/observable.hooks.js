import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

const hostNavigateObservable = window.__shared__.getObservable(
  "host:navigate",
  {
    type: "object",
    properties: {
      pathname: {
        type: "string",
      },
    },
    required: ["pathname"],
  }
);

export const authNavigateObservable = window.__shared__.getObservable(
  "auth:navigate",
  {
    type: "object",
    properties: {
      pathname: {
        type: "string",
      },
    },
    required: ["pathname"],
  }
);

export const observables = {
  "host:navigate": {
    observable: hostNavigateObservable,
    subscriptions: new Set(),
    subscribe: (subscription) => {
      observables["host:navigate"].subscriptions.add(subscription);
      observables["host:navigate"].observable.subscribe(subscription);
    },
    publish: (event) => {
      observables["host:navigate"].observable.publish(event);
    },
  },
  "auth:navigate": new Set(),
};

// NOTE: Hooks should be called only inside <Router> child to be able to work with useHistory()
export const useInitAuthObservables = () => {
  useInitHostNavigateObservable();
  useInitAuthNavigateObservable();
};

const useInitHostNavigateObservable = () => {
  const history = useHistory();

  const onHostNavigate = ({ pathname }) => {
    console.count("onHostNavigate");
    if (pathname !== history.location.pathname) {
      history.push(pathname);
    }
  };

  useLayoutEffect(() => {
    hostNavigateObservable.subscribe(onHostNavigate);
    subscribers["host:navigate"].add(onHostNavigate);
  });
};

const useInitAuthNavigateObservable = () => {
  const history = useHistory();

  const onHistoryChange = ({ pathname }) => {
    const lastEvent = authNavigateObservable.getLastEvent();
    if (lastEvent?.pathname !== pathname) {
      authNavigateObservable.publish({ pathname });
    }
  };
  history.listen(onHistoryChange);
};
