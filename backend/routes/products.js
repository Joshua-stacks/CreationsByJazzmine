// Allows routes to be declared in a separate file and imported.
const router = require("express").Router();

// Require handlers.
const { getAllProd, getProd } = require("../handlers/products");

// #Endpoints.

// Get all products
router.get("/api/products", getAllProd);

//Get one product
router.get("/api/products/:productId", getProd);

module.exports = router;
