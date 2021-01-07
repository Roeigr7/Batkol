const mongoose = require("mongoose");

const UploadedFile = new mongoose.Schema({
	type: String,
	path: String,
	size: Number,
	folder: String,
	filename: String,
});

const adminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
	},
	encryptedPassword: {
		type: String,
		required: true,
	},
	uploadedFile: UploadedFile,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { adminSchema, Admin };
