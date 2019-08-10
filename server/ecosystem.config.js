module.exports = {
  apps: [
    {
      name: 'API',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      wait_ready: true,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
