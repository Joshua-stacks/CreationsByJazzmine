// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { changePassword, login } = require("../handlers/admin");

// #Endpoints.

// Change the admin's password.
router.patch("/api/admin/account", changePassword);

// Sign in as admin.
router.post("/api/admin/login", login);

module.exports = router;
