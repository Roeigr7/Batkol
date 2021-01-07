const AdminBro = require("admin-bro");
const AdminBroMongoose = require("admin-bro-mongoose");
AdminBro.registerAdapter(AdminBroMongoose);
const AdminAdmin = require("./admin/admin.admin");

/**@type {AdminBro.AdminBroOptions} */
const options = {
	resources: [AdminAdmin],
};

module.exports = options;
