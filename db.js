/**
 * @external MongoClient
 * Docs {@link https://mongoosejs.com/docs/guide.html}.
 */
const MongoClient = require("mongodb").MongoClient;
const { DB_PATH, DB_NAME } = require("./config");

let db;

/**
 * @description Try to connect to mongodb instance
 * @returns {Object} MongoDb db object.
 */
async function connectToDb() {
	const client = await MongoClient.connect(DB_PATH, { useNewUrlParser: true });
	db = client.db(DB_NAME);
	return db;
}

/**
 * @description - Tries to connect to the given collection
 *
 * @param {string} collection - The name of the mongoDb collection.
 * @returns {Object} - The mongoDb collection.
 */
async function getCollection(collection) {
	if (!db) db = await connectToDb();
	const Collection = db.collection(collection);

	if (!Collection) throw new Error(`Collection ${collection} not found`);
	return Collection;
}

exports.getCollection = getCollection;
