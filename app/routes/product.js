/**
 * @namespace routes
 * @requires express.Router
 * @description Product routes
 */

const router = require("express").Router();
const validator = require("express-joi-validation")({});
const { params, query, body } = require("../schemas/product");
const paramsValidator = validator.params(params);
const queryValidator = validator.query(query);
const bodyValidator = validator.body(body);
const { getCollection } = require("../controllers/db");
const { ACCESS_TOKEN } = require("../config");
const UNPROCESSABLE_ENTITY = 422;

router.delete("*", checkAuth);
router.post("*", checkAuth);
router.put("*", checkAuth);

router.delete("/:id", paramsValidator, async function(req, res) {
	const { id: productId } = req.params;

	const Products = await getCollection("products");
	const result = await Products.deleteOne({ productId });

	if (result.deletedCount !== 1) {
		return res
			.status(UNPROCESSABLE_ENTITY)
			.json({ error: `No product with id: ${productId}` });
	}

	return res.json({ result: `Product ${productId} is deleted` });
});

router.get("/:id", paramsValidator, async (req, res, next) => {
	try {
		const { id: productId } = req.params;
		const Products = await getCollection("products");

		const result = await Products.findOne({ productId });

		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/", queryValidator, async (req, res) => {
	const limit = parseInt(req.query.limit) || 20;
	const Products = await getCollection("products");

	const products = await Products.find()
		.limit(limit)
		.toArray();

	res.json(products);
});

router.post("/", bodyValidator, async (req, res, next) => {
	const { name, description } = req.body;
	const Products = await getCollection("products");

	try {
		const product = {
			productId: await getNextId("productId"),
			name
		};

		if (description) {
			product.description = description;
		}

		const result = await Products.insertOne(product);

		if (result.insertedCount !== 1) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: "No product created" });
		}

		res.json({ product });
	} catch (err) {
		next(err);
	}
});

router.put("/:id", paramsValidator, bodyValidator, async (req, res, next) => {
	const { name, description } = req.body;
	const { id: productId } = req.params;
	const product = { name };

	if (description) {
		product.description = description;
	}

	try {
		const Products = await getCollection("products");

		const result = await Products.findOneAndUpdate(
			{ productId },
			{ $set: product },
			{ upsert: false, returnOriginal: false }
		);

		if (result.lastErrorObject.n !== 1) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: `No product with id: ${productId}` });
		}

		return res.json(result.value);
	} catch (err) {
		next(err);
	}
});

/**
 * @description Updates counter document and returns actual id.
 *
 * @param {string} idName - CounterId name.
 * @returns {number} - Actual id.
 */
async function getNextId(idName) {
	const Counters = await getCollection("counters");

	const result = await Counters.findOneAndUpdate(
		{ _id: idName },
		{ $inc: { counterId: 1 } },
		{ upsert: true, returnOriginal: false }
	);

	return result.value.counterId;
}

/**
 * @description Middleware that checks if the authorization is present and valid.
 *
 * @param {Object} req - HttpRequest object.
 * @param {Object} res - HttpResponse object.
 * @param {Function} next - Express next callback.
 * @returns {undefined}
 */
function checkAuth(req, res, next) {
	if (req.headers.authorization !== ACCESS_TOKEN) {
		return res.status(403).json({ error: "Mising authorization" });
	}

	next();
}

exports.product = router;
