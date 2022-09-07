// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const {
  changePassword,
  createProduct,
  deleteProduct,
  login,
  updateProduct,
} = require("../handlers/admin");

// #Endpoints.

// Change the admin's password.
router.patch("/api/admin/account", changePassword);

// Sign in as admin.
router.post("/api/admin/login", login);

// Create a new product.
router.post("/api/admin/products", createProduct);

// Delete a product.
router.delete("/api/admin/products/:_id", deleteProduct);

// Update a product.
router.patch("/api/admin/products/:_id", updateProduct);

module.exports = router;
