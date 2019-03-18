/**
 * @author Noel Garate
 */

/**
 * @external express
 * Docs {@link https://mongoosejs.com/docs/guide.html}.
 */
const express = require("express");
const { product } = require("./routes/product");
const { PORT } = require("./config");

const app = express();

app.use("/product", product);

app.listen(PORT);

console.log(`Listening at port: ${PORT}`);
