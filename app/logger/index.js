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
const { colorize, combine, json, simple, timestamp } = format;
const { DB_PATH, ENV, LOG_LEVEL, LOGS_DB_NAME } = require("../config");

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
	storeHost: true,
	db: `${DB_PATH}/${LOGS_DB_NAME}`,
	options: { useNewUrlParser: true },
	decolorize: true,
	collection: "main",
	includeIds: true,
	level: LOG_LEVEL
});

/**
 * @description Winston logger object
 */
const logger = (exports.logger = createLogger({
	level: LOG_LEVEL,
	format: combine(colorize({ all: true }), json(), timestamp()),
	label: { service: "prueba-node", env: ENV },
	transports: [envDaily, mongoDBTransport],
	handleExceptions: true
}));

// eslint-disable-next-line no-process-env
if (ENV !== "production") {
	logger.add(
		new transports.Console({
			format: combine(
				colorize({ all: true }),
				timestamp("YYYY-MM-DD HH:mm:ss"),
				simple()
			),
			level: "silly"
		})
	);
}

logger.stream = {
	write: function(message) {
		logger.info(message);
	}
};
