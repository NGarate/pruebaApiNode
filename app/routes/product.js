/**
 * @description Routes for /product.
 *
 * @module routes/product
 * @exports router
 * @requires express.Router
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

const validator = require("express-joi-validation")({});
const paramsValidator = validator.params(params);
const queryValidator = validator.query(query);
const bodyValidator = validator.body(body);

/**
 * @description - Express router with routes managers for /product.
 * @type {object}
 * @const
 */
exports.router = require("express").Router();
const router = exports.router;

router.delete("*", checkAuth);
router.post("*", checkAuth);
router.put("*", checkAuth);

router.delete("/:id", paramsValidator, deleteProduct);
router.get("/:id", paramsValidator, getProduct);
router.get("/", queryValidator, getProducts);
router.post("/", bodyValidator, postProduct);
router.put("/:id", paramsValidator, bodyValidator, putProduct);
