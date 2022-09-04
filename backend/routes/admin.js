// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { login } = require("../handlers/admin");

// #Endpoints.

// Sign in as admin.
router.post("/api/admin/login", login);

module.exports = router;
