import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

// NOTE: !!! This should be done only once per app. !!!
export const authNavigateObservable = window.__shared__?.getRemoteObservable(
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

// NOTE: !!! This should be done only once per app. !!!
export const hostNavigateObservable = window.__shared__?.getRemoteObservable(
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
  });
};

const useInitAuthNavigateObservable = () => {
  const history = useHistory();

  const onHistoryChange = ({ pathname }) => {
    const lastEvent = authNavigateObservable.observable.getLastEvent();
    if (lastEvent?.pathname !== pathname) {
      authNavigateObservable.publish({ pathname });
    }
  };
  history.listen(onHistoryChange);
};
