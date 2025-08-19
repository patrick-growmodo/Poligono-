/**
 * Security utilities and validation functions
 */

// Validate environment variables for security
export function validateEnvironmentVariables() {
  const requiredVars = [
    'AUTH0_DOMAIN',
    'AUTH0_CLIENT_ID', 
    'AUTH0_CLIENT_SECRET',
    'AUTH0_SECRET'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate AUTH0_SECRET length (should be at least 32 characters)
  if (process.env.AUTH0_SECRET && process.env.AUTH0_SECRET.length < 32) {
    throw new Error('AUTH0_SECRET must be at least 32 characters long');
  }

  // Validate domain format
  if (process.env.AUTH0_DOMAIN && !process.env.AUTH0_DOMAIN.includes('.auth0.com')) {
    console.warn('AUTH0_DOMAIN should be in format: your-tenant.auth0.com');
  }
}

// Security headers for API responses
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Validate user permissions (placeholder for role-based access)
export function validateUserPermissions(user: any, requiredPermissions: string[] = []) {
  if (!user) {
    return false;
  }

  // Add your permission validation logic here
  // Example: check user roles, permissions, etc.
  
  return true;
}

// Sanitize user input (basic example)
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}

// Rate limiting helper (placeholder)
export function checkRateLimit(identifier: string, limit: number = 100, windowMs: number = 900000) {
  // Implement rate limiting logic here
  // This is a placeholder - you should use a proper rate limiting library
  return true;
}

// CSRF protection helper
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  // Implement CSRF token validation
  // This is a placeholder - Auth0 handles CSRF protection automatically
  return true;
}
