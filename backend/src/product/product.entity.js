const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: [true, "שם קטגוריה זה קיים במערכת - נא לבחור שם אחר"],
			required: [true, "נא לבחור שם קטגוריה"],
			maxlength: [32, "נא להכניס מקסימום 32 תווים"],
			minlength: [2, "נא להכניס מינימום 2 תווים"],
		},
		slug: {
			trim: true,
			type: String,
			required: [true, "נא להכניס כתובת סלאג"],
			unique: [true, "כתובת הסלאג קיימת במערכת - נא להכניס כתובת סלאג אחר"],
			index: true,
			maxlength: [32, "נא להכניס מקסימום 32 תווים"],
			minlength: [2, "נא להכניס מינימום 2 תווים"],
		},
		desc: {
			type: String,
			required: [true, "נא להכניס הסבר על המוצר"],
			maxlength: [32, "נא להכניס מקסימום 32 תווים"],
			minlength: [2, "נא להכניס מינימום 2 תווים"],
		},
		image: {
			type: String,
		},
		categories: [{ type: ObjectId, ref: "Category", required: true }],
	},

	{ timeStamp: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { productSchema, Product };
