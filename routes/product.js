/**
 * @namespace routes
 * @requires express.Router
 * @description Product routes
 */

const router = require("express").Router();
const { getCollection } = require("../db");
const { ACCESS_TOKEN } = require("../config");

router.delete("*", checkAuth);
router.post("*", checkAuth);
router.put("*", checkAuth);

router.delete("/:id", async function(req, res) {
	const productId = checkId(req);

	const Products = await getCollection("products");
	const result = await Products.deleteOne({ productId });

	if (result.deletedCount !== 1) {
		return res.status(422).json({ error: `No product with id: ${productId}` });
	}

	return res.json({ result: `Product ${productId} is deleted` });
});

router.get("/:id", async (req, res) => {
	const productId = checkId(req);
	const Products = await getCollection("products");

	const result = await Products.findOne({ productId });

	res.json(result);
});

router.get("/", async (req, res) => {
	const limit = parseInt(req.query.limit) || 20;
	const Products = await getCollection("products");

	const products = await Products.find()
		.limit(limit)
		.toArray();

	res.json(products);
});

router.post("/", async (req, res) => {
	const { name, description } = req.query;

	if (!name) res.status(422).json({ error: "Mising param name" });
	const Products = await getCollection("products");

	try {
		const product = {
			productId: await getNextId("productId"),
			name
		};

		if (description) product.description = description;

		const result = await Products.insertOne(product);

		if (result.insertedCount !== 1) {
			return res.status(422).json({ error: "No product created" });
		}

		res.json({ product });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/:id", async function(req, res) {
	const productId = checkId(req);
	const { name, description } = req.query;

	if (!name) res.status(422).json({ error: "Mising param name" });
	const product = { name };

	if (description) product.description = description;
	const Products = await getCollection("products");

	const result = await Products.findOneAndUpdate(
		{ productId },
		{ $set: product },
		{ upsert: false, returnOriginal: false }
	);

	if (result.lastErrorObject.n !== 1) {
		return res.status(422).json({ error: `No product with id: ${productId}` });
	}

	return res.json(result.value);
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

/**
 * @description Checks if id is a valid integer, if not throws an error.
 *
 * @throws Error if id is not a integer.
 * @param {number} req - HttpRequest object.
 * @returns {undefined}
 */
function checkId(req) {
	const id = req.params.id;

	if (!id) throw new Error("Product not found");

	if (isNaN(id) || id != parseInt(id)) {
		throw new Error("Id must be a valid integer");
	}
	return parseInt(id);
}

exports.product = router;
