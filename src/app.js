require("dotenv").config({ override: true });
require("module-alias/register");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const customMethods = require("./middleware/global/customMethods");
const errorHandler = require("./middleware/global/errorHandler");
const notFoundHandler = require("./middleware/global/notFoundHandler");

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customMethods);
app.use("/api/auth", require("./routers/auth"));
app.use("/api/me", require("./routers/me"));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
