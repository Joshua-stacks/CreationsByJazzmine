// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const {
  addItem,
  getCart,
  deleteItem,
  updateItem,
} = require("../handlers/cart");

// Endpoints.

// Add an item to the user's cart.
router.post("/api/cart/client", addItem);

// Get the user's cart, or create one if it doesn't exist.
router.get("/api/cart", getCart);

// Delete an item from the user's cart.
router.delete("/api/cart/client", deleteItem);

// Update an item's quantity in the user's cart.
router.patch("/api/cart/client", updateItem);

module.exports = router;
