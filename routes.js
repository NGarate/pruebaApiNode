/**
 * @namespace routes
 * @requires express.Router
 */

const router = require("express").Router();
const { getCollection } = require("./db");
const { ACCESS_TOKEN } = require("./config");

router.get("/product/:id", async function(req, res) {
	const id = req.params.id;

	if (!id) res.status(422).json({ error: "Mising param id" });

	if (isNaN(id) || id != parseInt(id)) {
		return res.json({ error: "Id must be a valid integer" });
	}

	const Products = await getCollection("products");

	try {
		const result = await Products.findOne({ _id: parseInt(id) });

		if (!result) return res.status(422).json({ error: "Product not found" });

		res.json(result);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/products", async function(req, res) {
	const limit = req.query.limit || 20;

	const Products = await getCollection("products");

	try {
		const products = [];
		const cursor = Products.find({});

		for (let i = 0; i < limit; i++) {
			if (!(await cursor.hasNext())) break;
			const product = await cursor.next();

			if (isNaN(product._id)) {
				// Don't send the counter document to user
				i--;
				continue;
			}
			products.push(product);
		}

		if (!products.length) {
			return res.status(422).json({ error: "No products found" });
		}

		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/product", async function(req, res) {
	const { name, description } = req.query;
	const token = req.headers.authorization;

	if (token !== ACCESS_TOKEN) {
		return res.status(403).json({ error: "Mising authorization" });
	}

	if (!name) res.status(422).json({ error: "Mising param name" });
	const Products = await getCollection("products");

	try {
		const product = {
			_id: await getNextId(Products, "productId"),
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

router.delete("/product/:id", async function(req, res) {
	const id = req.params.id;
	const token = req.headers.authorization;

	if (token !== ACCESS_TOKEN) {
		return res.status(403).json({ error: "Mising authorization" });
	}

	if (isNaN(id) || id != parseInt(id)) {
		return res.status(422).json({ error: "Id must be a valid integer" });
	}

	const Products = await getCollection("products");

	try {
		const _id = parseInt(id);
		const result = await Products.deleteOne({ _id });

		if (result.deletedCount !== 1) {
			return res.status(422).json({ error: "No product deleted" });
		}

		return res.json({ result: `Product ${id} is deleted` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * @description Updates counter document and returns actual id.
 *
 * @param {*} Collection - MongoDb collection.
 * @param {string} idName - CounterId name.
 * @returns {number} - Actual id.
 */
async function getNextId(Collection, idName) {
	const document = await Collection.findOneAndUpdate(
		{ _id: idName },
		{ $inc: { counterId: 1 } },
		{ new: true }
	);

	return document.value.counterId;
}

exports.router = router;
