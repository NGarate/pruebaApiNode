const NodeEnvironment = require("jest-environment-node");
const path = require("path");
const fs = require("fs");

const globalConfigPath = path.join(__dirname, "globalConfig.json");

class MongoEnvironment extends NodeEnvironment {
	async setup() {
		// eslint-disable-next-line no-console
		console.log("Setup MongoDB Test Environment");
		const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, "utf-8"));

		this.global.__MONGO_URI__ = globalConfig.mongoUri;
		this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;

		await super.setup();
	}
}

module.exports = MongoEnvironment;
