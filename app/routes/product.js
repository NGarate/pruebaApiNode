/**
 * @description Routes for /product.
 *
 * @module routes/product
 * @requires express.Router
 * @requires express-joi-validation
 * @requires controllers/product
 * @requires controllers/auth
 * @requires schemas/product
 */

const {
	deleteProduct,
	getProduct,
	getProducts,
	postProduct,
	putProduct
} = require("../controllers/product");
const { checkAuth } = require("../controllers/auth");
const { params, query, body } = require("../schemas/product");
// eslint-disable-next-line no-unused-vars
const { logger } = require("../logger");
const UNPROCESSABLE_ENTITY = 422;
const validator = require("express-joi-validation")({
	statusCode: UNPROCESSABLE_ENTITY
});
const paramsValidator = validator.params(params);
const queryValidator = validator.query(query);
const bodyValidator = validator.body(body);

/**
 * @property {object} router - Express router with routes managers for /product.
 */
const router = (exports.router = require("express").Router());

router.delete("*", checkAuth);
router.post("*", checkAuth);
router.put("*", checkAuth);

router.delete("/:id", paramsValidator, deleteProduct);
router.get("/:id", paramsValidator, getProduct);
router.get("/", queryValidator, getProducts);
router.post("/", bodyValidator, postProduct);
router.put("/:id", paramsValidator, bodyValidator, putProduct);
