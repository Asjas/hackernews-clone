import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import Meta from './Meta';
import Header from './Header';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const Page = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>
      <div>
        <Meta />
        <Header />
        {children}
      </div>
    </ThemeProvider>
  </>
);

export default Page;
