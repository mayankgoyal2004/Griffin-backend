import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_PREFIX: process.env.API_PREFIX || "/api/v1",

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET || "griffin_default_jwt_secret_key_2026",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "griffin_default_cookie_secret_2026",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  DASHBOARD_URL: process.env.DASHBOARD_URL || "http://localhost:3000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};

