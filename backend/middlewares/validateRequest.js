const Joi = require('joi');
const { AppError } = require('./errorHandler');

/**
 * Validates request payload segments with Joi before controller execution.
 *
 * @param {{ body?: Joi.Schema, query?: Joi.Schema, params?: Joi.Schema }} schemas
 * @returns {import('express').RequestHandler}
 */
function validateRequest(schemas) {
  return (req, _res, next) => {
    try {
      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params, { abortEarly: false, stripUnknown: true });
        if (error) {
          return next(new AppError(`Invalid route params: ${error.message}`, 400, true));
        }
        req.params = value;
      }

      if (schemas.query) {
        const { error, value } = schemas.query.validate(req.query, { abortEarly: false, stripUnknown: true });
        if (error) {
          return next(new AppError(`Invalid query payload: ${error.message}`, 400, true));
        }
        req.query = value;
      }

      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
          return next(new AppError(`Invalid request payload: ${error.message}`, 400, true));
        }
        req.body = value;
      }

      return next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = {
  validateRequest
};
