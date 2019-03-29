/**
 * @description Manages and verifies authentication.
 * @module controllers/auth
 */
const { ACCESS_TOKEN } = require("../config");

/**
 * @function
 * @description - Middleware that checks if the authorization is present and valid.
 *
 * @param {Object} req - HttpRequest object.
 * @param {Object} res - HttpResponse object.
 * @param {Function} next - Express next callback.
 * @returns {undefined}
 */
exports.checkAuth = (req, res, next) => {
	const MISSING_AUTHORIZATION = 403;

	if (req.headers.authorization !== ACCESS_TOKEN) {
		return res
			.status(MISSING_AUTHORIZATION)
			.json({ error: "Mising authorization" });
	}

	next();
};
