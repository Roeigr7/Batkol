const express = require("express");
const mongoose = require("mongoose");
const { default: AdminBro } = require("admin-bro");
const options = require("./admin.options");
const buildAdminRouter = require("./admin.router");
require("dotenv").config();
//bring routes

//app
const app = express();

//port
const port = process.env.PORT || 8000;

const run = async () => {
	await mongoose.connect(process.env.DATABASE_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	const admin = new AdminBro(options);
	admin.watch();
	const router = buildAdminRouter(admin);
	app.use(admin.options.rootPath, router);
	app.listen(port, () => {
		console.log(`server running on port ${port}`);
	});
};
module.exports = run;
