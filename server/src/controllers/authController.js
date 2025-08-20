const { generateAuthUrl, completeOAuthFlow } = require('../services/googleAuthService');
const config = require('../config');

/**
 * Initiate Google OAuth login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const initiateGoogleLogin = (req, res) => {
  try {
    const authUrl = generateAuthUrl();
    console.log("🔗 Redirecting to Google:", authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error("❌ Error initiating Google login:", error);
    res.status(500).json({ error: "Failed to initiate login" });
  }
};

/**
 * Handle Google OAuth callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.error("❌ Missing authorization code");
    return res.status(400).json({ error: "Missing code from Google" });
  }

  try {
    console.log("🔄 Processing Google OAuth callback...");
    console.log("🔗 Client URL:", config.CLIENT_URL);
    console.log("🔗 Cookie options:", config.COOKIE_OPTIONS);
    
    // Complete OAuth flow and get ID token
    const { user, idToken } = await completeOAuthFlow(code);
    console.log("✅ OAuth flow completed, user:", { id: user.id, email: user.email, name: user.name });

    // Store ID token in session cookie
    res.cookie("session", idToken, config.COOKIE_OPTIONS);
    console.log('🍪 ID token stored in session cookie');
    console.log('🍪 Cookie length:', idToken.length);
    console.log('🍪 Cookie preview:', idToken.substring(0, 50) + '...');

    // Set additional headers for debugging
    res.setHeader('X-Auth-Status', 'success');
    res.setHeader('X-User-Email', user.email);

    // Redirect to frontend dashboard
    const redirectUrl = `${config.CLIENT_URL}/dashboard`;
    console.log('🔄 Redirecting to:', redirectUrl);
    console.log('🔄 Response headers before redirect:', res.getHeaders());
    
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error("❌ Error in Google callback:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ error: "Authentication failed" });
  }
};

/**
 * Get current user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCurrentUser = (req, res) => {
  try {
    console.log('👤 Getting current user:', req.user);
    res.json(req.user);
  } catch (error) {
    console.error("❌ Error getting current user:", error);
    res.status(500).json({ error: "Failed to get user information" });
  }
};

/**
 * Logout user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = (req, res) => {
  try {
    console.log('🚪 Logout endpoint called');
    
    // Clear session cookie
    res.clearCookie('session', {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      path: '/'
    });
    
    console.log('🧹 Session cookie cleared');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("❌ Error during logout:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};

/**
 * Health check endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const healthCheck = (req, res) => {
  res.json({ 
    message: "Auth server is running", 
    status: "ok",
    timestamp: new Date().toISOString()
  });
};

/**
 * Test endpoint to check configuration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const testConfig = (req, res) => {
  res.json({
    clientUrl: config.CLIENT_URL,
    nodeEnv: config.NODE_ENV,
    cookieOptions: config.COOKIE_OPTIONS,
    corsOptions: config.CORS_OPTIONS,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  initiateGoogleLogin,
  handleGoogleCallback,
  getCurrentUser,
  logout,
  healthCheck,
  testConfig
};
