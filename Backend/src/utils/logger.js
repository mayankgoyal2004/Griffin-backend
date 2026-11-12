/**
 * Formatted and timestamped logger
 */
const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (...args) => {
    console.log(`[INFO] [${getTimestamp()}]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[WARN] [${getTimestamp()}]`, ...args);
  },
  error: (...args) => {
    console.error(`[ERROR] [${getTimestamp()}]`, ...args);
  },
  debug: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEBUG] [${getTimestamp()}]`, ...args);
    }
  },
};

