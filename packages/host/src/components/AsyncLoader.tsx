import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Progress from "./Progress";

function ErrorFallback({ error }: any) {
  return (
    <div
      role="alert"
      style={{
        margin: "auto",
        marginTop: "10%",
        width: "600px",
        backgroundColor: "pink",
        padding: 50,
        borderRadius: 10,
        color: "red",
      }}
    >
      <b>Oh snap!</b>
      <p>
        There was a problem loading this part. Please try to reload the page.
      </p>
    </div>
  );
}

const AsyncLoader = ({ children }: any) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Progress />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncLoader;
