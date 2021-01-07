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
		key: function (req, file, cb) {
			cb(null, file.originalname);
		},
	}),
	limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("profileImage");

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext

	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	if (mimetype) {
		return cb(null, true);
	} else {
		cb("נא הכניס תמונות בלבד");
	}
}

module.exports = profileImgUpload;
