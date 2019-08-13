import React from 'react';
import App, { Container } from 'next/app';

import Page from '../components/Page';
import withData from '../lib/withData';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default withData(MyApp);
