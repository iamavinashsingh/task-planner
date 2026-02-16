/**
 * Creates a standardized API response payload.
 *
 * @param {boolean} success - Indicates operation result.
 * @param {any} [data=null] - Response payload data.
 * @param {string|null} [error=null] - Human-readable error message.
 * @returns {{success: boolean, data: any, error: string|null}}
 */
function buildApiResponse(success, data = null, error = null) {
  return {
    success,
    data,
    error
  };
}

/**
 * Sends a successful standardized API response.
 *
 * @param {import('express').Response} res - Express response object.
 * @param {any} [data=null] - Data payload.
 * @param {number} [statusCode=200] - HTTP status code.
 * @returns {import('express').Response}
 */
function sendSuccess(res, data = null, statusCode = 200) {
  return res.status(statusCode).json(buildApiResponse(true, data, null));
}

/**
 * Sends an error standardized API response.
 *
 * @param {import('express').Response} res - Express response object.
 * @param {string} error - Error message.
 * @param {number} [statusCode=400] - HTTP status code.
 * @param {any} [data=null] - Optional error context.
 * @returns {import('express').Response}
 */
function sendError(res, error, statusCode = 400, data = null) {
  return res.status(statusCode).json(buildApiResponse(false, data, error));
}

module.exports = {
  buildApiResponse,
  sendSuccess,
  sendError
};
