/**
 * @description App entry point.
 * @module Main
 * @author Noel Garate
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
const { logger } = require("./app/logger");
const product = require("./app/routes/product");
const { PORT } = require("./app/config");

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/product", product.router);

app.listen(PORT);

// eslint-disable-next-line no-console
logger.info(`Listening at port: ${PORT}`);
