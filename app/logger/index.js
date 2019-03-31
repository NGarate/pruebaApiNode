/**
 * @description Logger creation and configuration
 * @module logger
 * @requires winston
 * @requires config
 */

/**
 * @external winston
 * @see {@link https://www.npmjs.com/package/winston|Winston}
 */
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");
const { colorize, combine, json, simple, timestamp, prettyPrint } = format;
const { DB_PATH, ENV, LOG_LEVEL } = require("../config");

const envDaily = new transports.DailyRotateFile({
	name: "dailyRotateByEnvironment",
	frequency: "24h",
	filename: `${ENV}.log`,
	zippedArchive: true,
	dirname: "./logs",
	maxFiles: "30d",
	level: LOG_LEVEL
});

const mongoDBTransport = new transports.MongoDB({
	name: "MongoBDTransport",
	db: DB_PATH,
	defaultMeta: { Env: ENV },
	options: { useNewUrlParser: false },
	// tryReconnect: true,
	level: LOG_LEVEL,
	includeIds: true
});

/**
 * @description Winston logger object
 */
exports.logger = createLogger({
	level: LOG_LEVEL,
	format: combine(json(), timestamp(), prettyPrint(), colorize()),
	defaultMeta: { service: "prueba-node" },
	transports: [envDaily, mongoDBTransport],
	handleExceptions: true
});

// eslint-disable-next-line no-process-env
if (ENV !== "production") {
	exports.logger.add(
		new transports.Console({
			format: combine(timestamp("YYYY-MM-DD HH:mm:ss"), colorize(), simple()),
			level: "silly"
		})
	);
}
