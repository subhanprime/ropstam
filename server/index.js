require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const compression = require("compression");
const errorHandler = require("./errorHandler/errorHandler.js");
const connectDB = require("../server/config/connectDb.js");
const rootRouter = require("./routes/index.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins.js");
const corsOptions = require("./config/corsOptions.js");
connectDB(process.env.DB_URL);

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(express.json());

app.use("/api", rootRouter);
app.use("*", errorHandler);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
