/**
 * @author Noel Garate
 */

/**
 * @external express
 * Docs {@link https://mongoosejs.com/docs/guide.html}.
 */
const express = require("express");
const { router } = require("./routes");
const { PORT } = require("./config");

const app = express();

app.use("/", router);

app.listen(PORT);

console.log(`Listening at port: ${PORT}`);
