import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "marketing/MarketingApp";

export default function MarketingApp(): JSX.Element {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathName }: any) => {
        const pathname = history.location;

        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
      initialPath: history.location.pathname,
    });

    history.listen(onParentNavigate);
  });

  return <div ref={ref}></div>;
}
