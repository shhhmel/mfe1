import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "auth/AuthApp";

export default function AuthApp({ onSignIn }: any) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onUnmount } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }: any) => {
        const pathname = history.location;

        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
      onSignIn,
    });

    return () => {
      onUnmount();
      // TODO: Try to unmount here
    };
  });

  return <div ref={ref}></div>;
}
