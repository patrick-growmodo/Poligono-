const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

// Create OAuth2Client instance
const oauth2Client = new OAuth2Client(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.GOOGLE_REDIRECT_URI
);

/**
 * Generate Google OAuth URL for login
 * @returns {string} Google OAuth authorization URL
 */
const generateAuthUrl = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account'
  });

  console.log("🔗 Generated Google OAuth URL:", authUrl);
  return authUrl;
};

/**
 * Complete Google OAuth flow using google-auth-library
 * @param {string} code - Authorization code from Google
 * @returns {Object} User information and tokens
 */
const completeOAuthFlow = async (code) => {
  try {
    console.log("🔄 Completing OAuth flow with google-auth-library...");
    
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log("✅ Tokens received:", Object.keys(tokens));
    
    // Set credentials
    oauth2Client.setCredentials(tokens);
    
    // Get user info using the access token
    const userInfo = await oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    });
    
    const user = userInfo.data;
    console.log("✅ User info fetched:", { id: user.id, email: user.email, name: user.name });
    
    return {
      user,
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    };
  } catch (error) {
    console.error("❌ OAuth flow failed:", error);
    throw error;
  }
};

/**
 * Verify Google ID token
 * @param {string} idToken - Google ID token
 * @returns {Object} Verified token payload
 */
const verifyIdToken = async (idToken) => {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: config.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    console.log("✅ ID token verified:", { email: payload.email, name: payload.name });
    return payload;
  } catch (error) {
    console.error("❌ ID token verification failed:", error);
    throw error;
  }
};

module.exports = {
  generateAuthUrl,
  completeOAuthFlow,
  verifyIdToken
};
