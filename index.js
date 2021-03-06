const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const user = require("./router/user");
const stock = require("./router/stock");
const sale = require("./router/sale");
const bill = require("./router/bill");
// const db =require("./.env")

mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(err));

// res.header("Access-Control-Allow-Origin", "true");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/user", user);
app.use("/sale", sale);
app.use("/stock", stock);
app.use("/bill", bill);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`app is running at ${port}`);
});
