import React, { useEffect, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Progress from "./Progress";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  useEffect(() => {
    resetErrorBoundary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
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
