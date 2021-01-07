const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

//controllers
const { createProduct, productsList, productsAndCategoriesList } = require("../controllers/product");

//routers
router.post("/product", createProduct);
router.get("/products", productsList);
router.post("/products-categories", productsAndCategoriesList);

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

router.post("/profile-img-upload", (req, res) => {
	profileImgUpload(req, res, error => {
		// console.log( 'requestOkokok', req.file );
		// console.log( 'error', error );
		if (error) {
			console.log("errors", error);
			res.json({ error: error });
		} else {
			// If File not found
			if (req.file === undefined) {
				console.log("Error: No File Selected!");
				res.json("Error: No File Selected");
			} else {
				// If Success
				const imageName = req.file.key;
				const imageLocation = req.file.location; // Save the file name into database into profile modelres.json( {
				res.json({
					image: imageName,
					location: imageLocation,
				});
			}
		}
	});
});

// router.delete('/product/:slug', requireSignin, adminMiddleware,removeProduct);
// router.put('/product/:slug', requireSignin, adminMiddleware,updateProduct);

module.exports = router;
