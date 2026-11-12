import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import apiRouter from "./routes/index.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  ENV.CLIENT_URL,
  ENV.DASHBOARD_URL,
  ENV.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly permissive
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// HTTP request logger
if (ENV.NODE_ENV !== "test") {
  app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));
}

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser(ENV.COOKIE_SECRET));

// Root landing route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Griffin Construction Backend API is running.",
    docs: `${ENV.API_PREFIX}/health`,
    version: "1.0.0",
  });
});

// API Routes
app.use(ENV.API_PREFIX, apiRouter);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;

