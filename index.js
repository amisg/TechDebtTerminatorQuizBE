const express = require("express");
const server = express();

const mongoose = require("mongoose");
const cors = require("cors");

server.use(express.json({ limit: "50mb" })); // Adjust the size limit
server.use(express.urlencoded({ limit: "50mb", extended: true }));
server.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const homeRoute = require("./routes/home.routes");

server.use("/api/", homeRoute);

const connectionString = process.env.MONGO_CONNECTION;
// const database = "QuizDetails";

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("db connected");
	})
	.catch(() => {
		console.log("db not connected");
	});

const port = 8080;

server.listen(port, () => console.log(`server running on port ${port}`));
