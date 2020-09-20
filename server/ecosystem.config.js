module.exports = {
  apps: [
    {
      name: 'Hackernews Backend',
      script: 'dist/index.js',
      instances: '1',
      exec_mode: 'cluster',
      max_memory_restart: '400M',
      port: 3000,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
