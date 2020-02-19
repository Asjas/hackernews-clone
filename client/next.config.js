module.exports = {
  target: 'serverless',
  env: {
    BACKEND_URL: 'http://localhost:4000',
  },
  webpackDevMiddleware: config => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };
    return config;
  },
  poweredByHeader: false,
};
