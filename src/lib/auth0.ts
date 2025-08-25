import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN || "dev-8nhl0shrqgbj06nw.us.auth0.com",
  clientId: process.env.AUTH0_CLIENT_ID || "1bws2prO61EByAgmAeirvBn7tR6DuyIn",
  clientSecret: process.env.AUTH0_CLIENT_SECRET || "84ir1CIL--aQXnmX7Tqc30Z0AeyjB68FI1S0my94XBej_dpRVtRTsUN9VrgSgcb0",
  secret: process.env.AUTH0_SECRET || "supersecret",
  appBaseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  authorizationParameters: {
    scope: "openid profile email",
    audience: "https://console.poligono.xyz"
  }
}); 
