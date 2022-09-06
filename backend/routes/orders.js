// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { getAllOrders, getOrder } = require("../handlers/ordersHandle");

// #Endpoints.

// Get all orders
router.get("/api/orders", getAllOrders);

// Get One order
router.get("/api/order/:_id", getOrder);

module.exports = router;
