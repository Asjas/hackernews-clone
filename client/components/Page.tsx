import * as React from 'react';

import Meta from './Meta';
import Header from './Header';

import { ThemeProvider } from '../utils/themed-styled-components';
import { myTheme, GlobalStyle } from '../utils/theme';

function Page({ children }) {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <div>
          <GlobalStyle />
          <Meta />
          <Header />
          {children}
        </div>
      </ThemeProvider>
    </>
  );
}

export default Page;
