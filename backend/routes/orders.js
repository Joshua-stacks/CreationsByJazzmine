// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { getAllOrders, getOrder } = require("../handlers/orders");

// #Endpoints.

// Get all orders
router.get("/api/orders", getAllOrders);

// Get One order
router.get("/api/orders/:orderId", getOrder);

module.exports = router;
