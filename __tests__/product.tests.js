/* eslint-disable no-undef, no-magic-numbers */

const { MongoClient } = require("mongodb");

let connection;
let db;

beforeAll(async () => {
	connection = await MongoClient.connect(global.__MONGO_URI__, {
		useNewUrlParser: true
	});

	// eslint-disable-next-line require-atomic-updates
	db = await connection.db(global.__MONGO_DB_NAME__);
});

afterAll(async () => {
	await connection.close();
});

jest.mock("../app/controllers/db");

// eslint-disable-next-line no-unused-vars
const product = require("../app/controllers/product");

describe("Aggregate users to database", () => {
	it("should aggregate docs from collection", async () => {
		const files = db.collection("files");

		await files.insertMany([
			{ type: "Document" },
			{ type: "Video" },
			{ type: "Image" },
			{ type: "Document" },
			{ type: "Image" },
			{ type: "Document" }
		]);

		const topFiles = await files
			.aggregate([
				{ $group: { _id: "$type", count: { $sum: 1 } } },
				{ $sort: { count: -1 } }
			])
			.toArray();

		expect(topFiles).toEqual([
			{ _id: "Document", count: 3 },
			{ _id: "Image", count: 2 },
			{ _id: "Video", count: 1 }
		]);
	});
});
