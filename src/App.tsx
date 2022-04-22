import React from 'react';
import { Toaster } from 'react-hot-toast';

import { AppProvider } from 'providers/app';
import { Routes } from 'providers/Routes';
import ThemeConfig from 'theme';
import ScrollToTop from 'utils/scrollToTop';
import GlobalStyle from 'theme/globalStyle';

function App() {
  return (
    <AppProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyle />
        <Routes />
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeConfig>
    </AppProvider>
  );
}

export default App;
