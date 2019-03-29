/**
 * @module controllers/product
 */
const { getCollection } = require("../controllers/db");
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

/**
 * @async
 * @function
 * @description - Recivies and id and delete the product with the provided id
 *
 * @param {Object} req - Http request.
 * @param {Object} req.params - Http params.
 * @param {Object} req.params.id - Product's id.
 * @param {Object} res - Http response.
 * @returns {undefined}
 */
exports.deleteProduct = async function(req, res) {
	try {
		const { id: productId } = req.params;

		const Products = await getCollection("products");
		const result = await Products.deleteOne({ productId });

		if (!result.deletedCount) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: `No product with id: ${productId}` });
		}

		res.json({ result: `Product ${productId} is deleted` });
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

/**
 * @async
 * @function
 * @description - Recivies and id and send back the product with the provided id.
 *
 * @param {Object} req - Request parameters.
 * @param {Object} req.params - Request parameters.
 * @param {number} req.params.id - Product's id.
 * @param {Object} res - Http response.
 * @returns {undefined}
 */
exports.getProduct = async function(req, res) {
	try {
		const { id: productId } = req.params;
		const Products = await getCollection("products");

		const result = await Products.findOne({ productId });

		if (!result) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: `No product find with id: ${productId}` });
		}
		res.json(result);
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

/**
 * @async
 * @function
 * @description - Send back all product till the limit
 *
 * @param {Object} req - Http request.
 * @param {Object} req.query - Request body.
 * @param {number} [req.query.limit=20] - The maximun number of products.
 * @param {Object} res - Http response.
 * @returns {undefined}
 */
exports.getProducts = async function(req, res) {
	try {
		const DEFAULT_LIMIT = 20;
		const limit = parseInt(req.query.limit || DEFAULT_LIMIT);
		const Products = await getCollection("products");

		const products = await Products.find()
			.limit(limit)
			.toArray();

		res.json(products);
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

/**
 * @async
 * @function
 * @description - Create a new product width the data provided,
 * gives it a new sequential id and send it back.
 *
 * @param {Object} req - Http request.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.name - Product's name.
 * @param {string} [req.body.description=""] - Product's description.
 * @param {Object} res - Http response.
 * @returns {undefined}
 */
exports.postProduct = async function(req, res) {
	try {
		const { name, description = "" } = req.body;
		const Products = await getCollection("products");

		const product = {
			productId: await getNextId("productId"),
			name,
			description
		};

		const result = await Products.insertOne(product);

		if (!result.insertedCount) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: "No product created" });
		}

		res.json({ product });
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

/**
 * @async
 * @function
 * @description - Updates a product with the provided id width the given data
 *  and send it back.
 *
 * @param {Object} req - Http request.
 * @param {Object} req.params - Request params.
 * @param {number} req.params.id - Product's id.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.name - Product's name.
 * @param {string} [req.body.description=""] - Product's description.
 * @param {Object} res - Http response.
 * @returns {undefined}
 */
exports.putProduct = async function(req, res) {
	try {
		const { name, description = "" } = req.body;
		const { id: productId } = req.params;
		const product = { name, description }.filter(el => el);

		const Products = await getCollection("products");

		const result = await Products.findOneAndUpdate(
			{ productId },
			{ $set: product },
			{ upsert: false, returnOriginal: false }
		);

		if (!result.lastErrorObject.n) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.json({ error: `No product with id: ${productId}` });
		}

		return res.json(result.value);
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

/**
 * @async
 * @function
 * @description - Updates counter document and returns actual id.
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
