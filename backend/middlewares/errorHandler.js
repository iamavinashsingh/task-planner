const { buildApiResponse } = require('../utils/apiResponse');

/**
 * Application-level operational error that carries HTTP semantics and safe
 * user-facing messaging.
 */
class AppError extends Error {
  /**
   * @param {string} message - Safe error message for API clients.
   * @param {number} [statusCode=500] - HTTP status code.
   * @param {boolean} [isOperational=true] - Indicates expected operational failure.
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Express middleware that converts unknown errors into safe standardized API
 * responses while preserving logs for observability.
 *
 * @param {Error & {statusCode?: number, isOperational?: boolean}} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 * @returns {import('express').Response}
 */
function errorHandler(err, _req, res, _next) {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const isOperational = Boolean(err.isOperational);

  const safeMessage = isOperational
    ? err.message
    : 'An unexpected error occurred. Please try again later.';

  if (process.env.NODE_ENV !== 'test') {
    console.error('[ErrorHandler]', {
      name: err.name,
      message: err.message,
      statusCode,
      stack: err.stack
    });
  }

  return res.status(statusCode).json(buildApiResponse(false, null, safeMessage));
}

/**
 * Handles unmatched route requests.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
function notFoundHandler(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, true));
}

module.exports = {
  AppError,
  errorHandler,
  notFoundHandler
};
