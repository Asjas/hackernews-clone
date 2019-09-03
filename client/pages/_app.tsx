import React from 'react';
import App from 'next/app';
import { Provider } from 'urql';

import Page from '../components/Page';
import withUrqlClient from '../lib/with-urql-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, urqlClient } = this.props as any;

    return (
      <Provider value={urqlClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    );
  }
}

export default withUrqlClient(MyApp);
