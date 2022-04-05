import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { AUTH_APP_CHANNEL, HOST_APP_CHANNEL } from "./constants";
import { Observable } from "./observable";

// NOTE: Hooks should be called only inside <Router> child to be able to work with useHistory()
export const useInitHostObservables = (): void => {
  useInitHostNavigateObservable();
  useInitAuthNavigateObservable();
};

const useInitHostNavigateObservable = (): void => {
  const history = useHistory();
  const hostNavigateObservable = new Observable(
    HOST_APP_CHANNEL.NAVIGATE.EVENT,
    HOST_APP_CHANNEL.NAVIGATE.SCHEMA
  );

  const onHistoryChange = ({ pathname }: any) => {
    const lastEvent = hostNavigateObservable.getLastEvent();
    if (lastEvent?.pathname !== pathname) {
      hostNavigateObservable.publish({ pathname });
    }
  };
  history.listen(onHistoryChange);
};

const useInitAuthNavigateObservable = (): void => {
  const authNavigateObservable = new Observable(
    AUTH_APP_CHANNEL.NAVIGATE.EVENT,
    AUTH_APP_CHANNEL.NAVIGATE.SCHEMA
  );
  const history = useHistory();

  const onAuthNavigate = ({ pathname }: any) => {
    console.count("onAuthNavigate");
    if (pathname !== history.location.pathname) {
      history.push(pathname);
    }
  };

  useLayoutEffect(() => {
    authNavigateObservable.subscribe(onAuthNavigate);
  });
};
