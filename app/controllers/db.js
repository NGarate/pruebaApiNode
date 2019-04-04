/**
 * @description Manages database connection.
 * @module controllers/DB
 * @requires MongoClient
 * @requires config
 */

/**
 * @external MongoClient
 * @see {@link https://mongodb.github.io/node-mongodb-native/3.2/api|Mongo Native Driver docs}
 */
const { MongoClient } = require("mongodb");
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
exports.connectToDb = async () => {
	const client = await MongoClient.connect(DB_PATH, { useNewUrlParser: true });
	db = client.db(DB_NAME);
	return db;
};

/**
 * @async
 * @function
 * @description - Tries to connect to provided collection.
 *
 * @param {string} collection - MongoDB collection's name.
 * @returns {Object} - A MongoDB collection.
 */
exports.getCollection = async collection => {
	if (!db) {
		db = await exports.connectToDb();
	}
	const Collection = db.collection(collection);

	if (!Collection) {
		throw new Error(`Collection ${collection} not found`);
	}
	return Collection;
};
