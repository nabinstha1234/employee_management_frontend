import React from 'react';
import { Toaster } from 'react-hot-toast';

import { AppProvider } from 'providers/app';
import { Routes } from 'providers/Routes';

function App() {
  return (
    <AppProvider>
      <Routes />
      <Toaster position="top-center" reverseOrder={false} />
    </AppProvider>
  );
}

export default App;
