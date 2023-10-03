const express = require("express");
const app = express();
const errorMiddleware = require("./Middlewares/error");
const morgan=require("morgan");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blog=require("./route");
app.use("/api",blog);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;