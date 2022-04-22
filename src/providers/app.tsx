import React from 'react';
import { Button, Typography } from '@mui/material';

import { ReactErrorBoundary } from 'components/organisms';
import { Spinner } from 'components/molecules';

const ErrorFallback = () => {
  return (
    <div>
      <Typography variant="h2" textAlign="center">
        Ooops, something went wrong!
      </Typography>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="w-100 h-100 d-flex justfy-content-center align-items-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <div>
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
      </div>
    </React.Suspense>
  );
};
