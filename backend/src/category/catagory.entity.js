const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: [true, "שם מוצר זה קיים במערכת - נא לבחור שם אחר"],
			required: [true, "נא לבחור שם מוצר"],
			maxlength: [32, "נא להכניס מקסימום 32 תווים"],
			minlength: [2, "נא להכניס מינימום 2 תווים"],
		},
		slug: {
			trim: true,
			type: String,
			index: true,
		},
	},

	{ timeStamp: true }
);
categorySchema.path("name").validate(function (name) {
	const regex = /^[0-9a-zא-ת- ]+$/;
	if (regex.test(name)) {
		return true;
	} else throw new Error("נא להכניס אותיות בעברית או אותיות קטנות באנגלית בלבד - בשביל רווח יש להשתמש במקף");
});
// categorySchema.path("slug").validate(function (name) {
// 	let slugFromName = name.split(" ").join("-");
// 	console.log(slugFromName);
// });
const Category = mongoose.model("Category", categorySchema);

module.exports = { categorySchema, Category };
