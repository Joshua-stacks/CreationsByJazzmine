// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { createCart } = require("../handlers/cart");

// Endpoints.

// Create a cart for the user.
router.get("/api/cart", createCart);

module.exports = router;
