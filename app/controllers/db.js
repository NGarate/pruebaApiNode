/**
 * @module DB
 * @requires MongoClient
 */

/**
 * @external MongoClient {@link https://mongodb.github.io/node-mongodb-native/3.2/api/ Documentation}
 */
const MongoClient = require("mongodb").MongoClient;
const { DB_PATH, DB_NAME } = require("../config");

let db;

/**
 * @private
 * @async
 * @function
 * @description - Try to connect to mongodb instance
 *
 * @returns {Object} MongoDb db object.
 */
async function connectToDb() {
	const client = await MongoClient.connect(DB_PATH, { useNewUrlParser: true });
	db = client.db(DB_NAME);
	return db;
}

/**
 * @async
 * @function
 * @description - Tries to connect to the given collection
 *
 * @param {string} collection - The name of the mongoDb collection.
 * @returns {Object} - The mongoDb collection.
 */
exports.getCollection = async collection => {
	if (!db) {
		db = await connectToDb();
	}
	const Collection = db.collection(collection);

	if (!Collection) {
		throw new Error(`Collection ${collection} not found`);
	}
	return Collection;
};
