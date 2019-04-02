/**
 * @description App entry point.
 * @module Main
 * @author Noel Garate
 * @requires express
 * @requires helmet
 * @requires morgan
 * @requires cookieParser
 */

/**
 * @external express
 * @see {@link https://expressjs.com/en/4x/api.html|Express docs}
 */
const express = require("express");

/**
 * @external helmet
 * @see {@link https://helmetjs.github.io|Helmet docs}
 */
const helmet = require("helmet");

/**
 * @external cookieParser
 * @see {@link https://www.npmjs.com/package/cookie-parser|cookie-parser}
 */
const cookieParser = require("cookie-parser");

/**
 * @external morgan
 * @see {@link https://www.npmjs.com/package/morgan|morgan}
 */
const morgan = require("morgan");

const { logger } = require("./app/logger");
const product = require("./app/routes/product");
const { PORT, ENV, COOKIE_SECRET } = require("./app/config");

const app = express();
app.use(helmet());
app.use(morgan("short", logger.stream));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use("/product", product.router);

// eslint-disable-next-line promise/prefer-await-to-callbacks
app.use((error, req, res) => {
	// Only providing error in development
	res.locals.message = error.message;
	res.locals.error = ENV === "development" ? error : {};

	logger.error(error.message, error);

	// eslint-disable-next-line no-magic-numbers
	res.status(error.status || 500);
	res.render("error");
});
app.listen(PORT);

logger.info(`Listening at port: ${PORT}`);
