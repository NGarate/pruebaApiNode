const Joi = require("joi");

const params = Joi.object().keys({
	id: Joi.number()
		.integer()
		.required()
});

const query = Joi.object().keys({
	limit: Joi.number().integer()
});

const body = Joi.object().keys({
	name: Joi.string()
		.regex(/^[a-zA-Z0-9 ]+$/, "alphanumeric and white spaces")
		.trim()
		.required(),
	description: Joi.string().trim()
});

exports.params = params;
exports.query = query;
exports.body = body;
