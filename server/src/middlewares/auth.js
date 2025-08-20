const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

// Create OAuth2Client instance for token verification
const oauth2Client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

/**
 * Middleware to require authentication
 * Verifies Google ID token from cookies and attaches user to request
 */
const requireAuth = async (req, res, next) => {
  console.log('🔍 Auth middleware - Cookies:', req.cookies);
  
  const idToken = req.cookies?.session;

  if (!idToken) {
    console.log('❌ No ID token found');
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Debug: Decode token without verification to see the header
    const jwt = require('jsonwebtoken');
    const decodedHeader = jwt.decode(idToken, { complete: true });
    console.log('🔍 Token header:', decodedHeader?.header);
    console.log('🔍 Token payload:', decodedHeader?.payload);

    // Verify Google ID token
    const ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: config.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token payload' })
    }
    const googleUser = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    }

    // Only attempt Auth0 integration if Auth0 is configured
    let auth0User;
    if (config.AUTH0_DOMAIN && config.AUTH0_M2M_CLIENT_ID) {
      try {
        console.log('🔍 Attempting to find/create user in Auth0:', googleUser.email)
        auth0User = await findOrCreateAuth0UserDatabase(googleUser)
        console.log('✅ Auth0 user found/created:', auth0User.user_id)
      } catch (auth0Error) {
        console.error('❌ Auth0 error:', auth0Error)
        // If Auth0 fails, use fallback user object
        auth0User = {
          user_id: `auth0|${googleUser.googleId}`,
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
        }
        console.log('⚠️ Using fallback user object:', auth0User.user_id)
      }
    } else {
      console.log('⚠️ Auth0 not configured, using Google user directly')
      auth0User = {
        user_id: `google|${googleUser.googleId}`,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      }
    }
    console.log('✅ Google ID token verified, user:', { 
      email: payload.email, 
      name: payload.name,
      sub: payload.sub 
    });

    // Attach user data to request
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    next();
  } catch (err) {
    console.error('❌ Google ID token verification failed:', err);
    console.error('❌ Error details:', {
      name: err.name,
      message: err.message,
      token: idToken.substring(0, 50) + '...'
    });
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
// Function to find or create user in Auth0 using database connection
const findOrCreateAuth0UserDatabase = async (googleUser) => {
  const auth0ManagementToken = await getAuth0ManagementToken()
  
  try {
    // First, try to find the user by email
    const searchResponse = await fetch(
      `https://${config.AUTH0_DOMAIN}/api/v2/users?q=email:"${googleUser.email}"&search_engine=v3`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth0ManagementToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const users = await searchResponse.json()

    if (users && users.length > 0) {
      // User exists, return the existing user
      console.log('👤 Found existing user in Auth0')
      return users[0]
    }

    console.log('➕ Creating new user in Auth0 database connection')
    
    // User doesn't exist, create a new one using Username-Password-Authentication (database connection)
    const createResponse = await fetch(
      `https://${config.AUTH0_DOMAIN}/api/v2/users`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth0ManagementToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connection: 'Username-Password-Authentication', // Default database connection
          email: googleUser.email,
          password: generateRandomPassword(), // Required for database connection
          name: googleUser.name,
          picture: googleUser.picture,
          email_verified: true, // Since it's verified by Google
          verify_email: false, // Don't send verification email since it's already verified
          app_metadata: {
            provider: 'google',
            google_id: googleUser.googleId,
            login_method: 'google_oauth'
          },
          user_metadata: {
            picture: googleUser.picture,
            provider: 'google'
          }
        }),
      }
    )

    if (!createResponse.ok) {
      const errorData = await createResponse.json()
      console.error('❌ Create user error:', errorData)
      throw new Error(`Failed to create user in Auth0: ${errorData.message}`)
    }

    const newUser = await createResponse.json()
    console.log('✅ Successfully created user in Auth0:', newUser.user_id)
    return newUser

  } catch (error) {
    console.error('Auth0 Management API error:', error)
    throw error
  }
}

// Get Auth0 Management API token
const getAuth0ManagementToken = async () => {
  console.log('🔑 Getting Auth0 Management token...')
  console.log('🔗 Auth0 Domain:', config.AUTH0_DOMAIN)
  console.log('🔗 M2M Client ID:', config.AUTH0_M2M_CLIENT_ID)
  
  const tokenUrl = `https://${config.AUTH0_DOMAIN}/oauth/token`
  console.log('🔗 Token URL:', tokenUrl)
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.AUTH0_M2M_CLIENT_ID,
      client_secret: config.AUTH0_M2M_CLIENT_SECRET,
      audience: `https://${config.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  })

  console.log('📡 Response status:', response.status)
  console.log('📡 Response headers:', response.headers)
  
  const responseText = await response.text()
  console.log('📄 Raw response:', responseText)
  
  let data
  try {
    data = JSON.parse(responseText)
  } catch (parseError) {
    console.error('❌ JSON Parse Error:', parseError)
    console.error('❌ Response was:', responseText)
    throw new Error(`Invalid JSON response from Auth0: ${responseText}`)
  }
  
  if (!response.ok) {
    console.error('❌ Failed to get management token:', data)
    throw new Error(`Failed to get Auth0 management token: ${data.error_description || data.error || 'Unknown error'}`)
  }

  console.log('✅ Got Auth0 Management token')
  return data.access_token
}
// Generate a secure random password for Auth0 database users
const generateRandomPassword = () => {
  const length = 32
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  return password
}

/**
 * Optional authentication middleware
 * Attaches user to request if token exists, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  const idToken = req.cookies?.session;

  if (idToken) {
    try {
      const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: config.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };
    } catch (err) {
      console.error('❌ Google ID token verification failed in optional auth:', err);
    }
  }

  next();
};

module.exports = {
  requireAuth,
  optionalAuth
};
