const app = require('./src/app');
const config = require('./src/config');

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Auth server running on port ${config.PORT}`);
  console.log(`🌐 Client URL: ${config.CLIENT_URL}`);
  console.log(`🔗 Google OAuth URL: http://localhost:${config.PORT}/api/auth/login`);
  console.log(`📊 Health check: http://localhost:${config.PORT}/api/auth`);
  console.log(`🔧 Environment: ${config.NODE_ENV}`);
});

 