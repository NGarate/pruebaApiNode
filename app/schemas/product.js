/**
 * @description JOI's schemas for product.
 * @module schemas/product
 * @requires joi
 */
const Joi = require("@hapi/joi");

/**
 * @description Schema for request params.
 * @const
 * @example { id: Joi.number().integer().required() }
 */
exports.params = Joi.object().keys({
	id: Joi.number()
		.integer()
		.required()
});

/**
 * @description Schema for request query.
 * @const
 * @example { limit: Joi.number().integer() }
 */
exports.query = Joi.object().keys({
	limit: Joi.number().integer()
});

/**
 * @description Schema for request body.
 * @const
 * @example
	{
	name: Joi.string()
 			.regex(/^[a-zA-Z0-9 ]+$/, "alphanumeric and white spaces")
			.trim()
			.required(),
	description: Joi.string().trim()
	}
 */
exports.body = Joi.object().keys({
	name: Joi.string()
		.regex(/^[a-zA-Z0-9 ]+$/, "alphanumeric and white spaces")
		.trim()
		.required(),
	description: Joi.string().trim()
});
