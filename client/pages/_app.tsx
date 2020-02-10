import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import withApolloClient from '../utils/with-apollo-client';

class MyApp extends App {
  render() {
    // @ts-ignore
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
