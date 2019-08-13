import * as React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import initApollo from './init-apollo';

const isBrowser: boolean = typeof window === 'undefined';

export default (App: any) => {
  return class withData extends React.Component {
    private apollo: ApolloClient<any>;

    constructor(props: any, ctx) {
      super(props, ctx);
      this.apollo = initApollo(props.apolloState);
    }

    static displayName = 'withData(App)';

    static async getInitialProps(ctx: any) {
      const { AppTree } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();

      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <AppTree {...appProps} apolloClient={apollo} />
            </ApolloProvider>,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
