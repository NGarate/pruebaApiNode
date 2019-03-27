/**
 * @fileOverview main
 * @author Noel Garate
 */

/**
 * @external Express {@link https://expressjs.com/en/4x/api.html}
 */
const express = require("express");
const product = require("./app/routes/product");
const { PORT } = require("./app/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/product", product.router);

app.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Listening at port: ${PORT}`);
