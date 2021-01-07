const AdminBro = require("admin-bro");
const { buildAuthenticatedRouter } = require("admin-bro-expressjs");
const argon2 = require("argon2");
const { Admin } = require("./admin/admin.entity");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
/**@param {AdminBro} admin
 * @return {express.Router} router
 *
 */

const buildAdminRouter = admin => {
	const router = buildAuthenticatedRouter(
		admin,
		{
			cookieName: "dsadsa",
			cookiePassword: "superleoeokodkaok",
			authenticate: async (email, password) => {
				const admin = await Admin.findOne({ email });
				if (admin && argon2.verify(admin.encryptedPassword, password)) {
					return admin.toJSON();
				}
				return null;
			},
		},
		null,
		{ resave: false, saveUninitialized: true, store: new MongoStore({ mongooseConnection: mongoose.connection }) }
	);
	return router;
};
module.exports = buildAdminRouter;
