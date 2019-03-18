const { defaults } = require("jest-config");
module.exports = {
	...defaults,
	bail: 1,
	errorOnDeprecated: true,
	extraGlobals: ["fs", "Math", "os", "path", "stream", "util"],
	maxConcurrency: 2,
	projects: [{ displayName: "test" }],
	rootDir: "./",
	testEnvironment: "node",
	testPathIgnorePatterns: ["/node_modules/"],
	verbose: true
};
