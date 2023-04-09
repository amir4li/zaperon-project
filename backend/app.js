const express = require("express");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/api/v1/users", authRouter);


module.exports = app;
