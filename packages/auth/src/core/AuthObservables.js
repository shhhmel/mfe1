import React, { memo } from "react";
import { useInitAuthObservables } from "./observable.hooks";

const AuthObservables = memo(
  () => {
    useInitAuthObservables();

    return <></>;
  },
  () => true
);

export default AuthObservables;
