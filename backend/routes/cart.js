// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { addItem, createCart } = require("../handlers/cart");

// Endpoints.

// Add an item to the user's cart.
router.post("/api/cart/client", addItem);

// Create a cart for the user or retrieve it if it already exists.
router.get("/api/cart", createCart);

module.exports = router;
