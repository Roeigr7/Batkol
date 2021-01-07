const argon2 = require("argon2");
const AdminBro = require("admin-bro");
const fs = require("fs");
const path = require("path");
///checks the password after response///
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
	accessKeyId: process.env.S3_ACCESS_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	Bucket: "batkolbucket",
});

const profileImgUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "batkolbucket",
		acl: "public-read",
	}),
	limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
}).single("profileImage");

const imageAfter = async (response, request, context) => {
	const { record, uploadImage } = context;
	console.log(
		"ImageAfter??????????????????????????????????????????",
		uploadImage,
		"ImageRECORD??????????????????????????????????????????",
		record
	);
	if (record.isValid() && uploadImage) {
		console.log("ccccccccccccccccccccccccccccccc");
		profileImgUpload();
	}
	return response;
};
///password before response///
const imageBefore = async (request, context) => {
	if (request.method === "post") {
		const { uploadImage, ...otherParams } = request.payload;
		context.uploadImage = uploadImage;
		console.log("ImageBefore!!!!!!!!!!!!!!!!!!!!!!", request.payload.uploadImage);
		return {
			...request,
			payload: otherParams,
		};
	}
	return request;
};

module.exports = { imageAfter, imageBefore };
