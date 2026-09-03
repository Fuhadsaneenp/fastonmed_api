import "dotenv/config";

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3002,http://localhost:3001,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || "dev-fastonmed-secret",
  zoho: {
    clientId: process.env.ZOHO_CLIENT_ID || "",
    clientSecret: process.env.ZOHO_CLIENT_SECRET || "",
    refreshToken: process.env.ZOHO_REFRESH_TOKEN || "",
    organizationId: process.env.ZOHO_ORGANIZATION_ID || "",
    accountsUrl: process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com",
    apiBaseUrl: process.env.ZOHO_API_BASE_URL || "https://www.zohoapis.com"
  }
};
