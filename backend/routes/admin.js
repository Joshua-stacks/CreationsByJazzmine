// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const {
  login,
  changePassword,
  createProduct,
  updateProduct,
  deleteProduct,
  updateOrder,
  deleteOrder,
} = require("../handlers/admin");

// #Endpoints.

// Sign in as admin.
router.post("/api/admin/login", login);

// Change the admin's password.
router.patch("/api/admin/account", changePassword);

// Create a new product.
router.post("/api/admin/products", createProduct);

// Update a product.
router.patch("/api/admin/products/:productId", updateProduct);

// Delete a product.
router.delete("/api/admin/products/:productId", deleteProduct);

// Update an order.
router.patch("/api/admin/orders/:orderId", updateOrder);

// Delete an order.
router.delete("/api/admin/orders/:orderId", deleteOrder);

module.exports = router;
