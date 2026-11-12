import app from "./app.js";
import { connectDB, prisma } from "./config/db.js";
import { ENV } from "./config/env.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  // Connect to Database
  await connectDB();

  const server = app.listen(ENV.PORT, () => {
    logger.info(`🚀 Server running in ${ENV.NODE_ENV} mode on http://localhost:${ENV.PORT}`);
    logger.info(`📡 API endpoint: http://localhost:${ENV.PORT}${ENV.API_PREFIX}`);
    logger.info(`❤️ Health check: http://localhost:${ENV.PORT}${ENV.API_PREFIX}/health`);
  });

  // Graceful shutdown handlers
  const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Gracefully terminating server...`);
    server.close(async () => {
      logger.info("HTTP server closed.");
      await prisma.$disconnect();
      logger.info("Prisma database connection closed.");
      process.exit(0);
    });

    // Force close after 10 seconds if hanging
    setTimeout(() => {
      logger.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
  });

  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
  });
}

startServer();

