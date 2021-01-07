const AdminBro = require("admin-bro");
const { Admin } = require("./admin.entity");
const { passwordAfter, passwordBefore } = require("./actions/passHash");
const uploadFeature = require("@admin-bro/upload");
/**@type {AdminBro.ResourceOptions} */

const options = {
	properties: {
		encryptedPassword: {
			isVisible: false,
		},
		password: {
			type: "password",
		},
	},
	features: [
		uploadFeature({
			provider: {
				aws: {
					accessKeyId: process.env.S3_ACCESS_ID,
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
					Bucket: "batkolbucket",
					region: "EU (Paris) eu-west-3",
				},
			},
			properties: {
				file: "virtual",
				key: "uploadedFile.path",
				mimeType: "uploadedFile.type", // this property is important because allows to have previews
				size: "uploadedFile.size",
				filename: "uploadedFile.filename",
			},
		}),
	],
	actions: {
		new: {
			after: passwordAfter,
			before: passwordBefore,
		},
		edit: {
			after: passwordAfter,
			before: passwordBefore,
		},
	},
};
module.exports = {
	options,
	resource: Admin,
};
