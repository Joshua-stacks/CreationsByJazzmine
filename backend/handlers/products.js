// Require MongoDB related functions.
const { MongoClient, ObjectId } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Set MongoDB parameters.
const parameters = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get all products
const getAllProd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);
  try {
    await client.connect();
    const db = client.db("Project");
    const result = await db.collection("Product").find().toArray();
    return res.status(200).json({
      status: 200,
      products: result,
      message: "These are all the products",
    });
  } catch (err) {
    console.error("Error getting products:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

//Get one product
const getProd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);
  //Get the item by _id
  const prod = req.params.productId;
  try {
    await client.connect();
    const db = client.db("Project");
    const product = await db
      .collection("Product")
      .findOne({ _id: ObjectId(prod) });

    // Verify that the product was found.
    if (product) {
      return res.status(200).json({
        status: 200,
        product: product,
        message: "Product selected",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "No product found.",
      });
    }
  } catch (err) {
    console.error("Error getting product:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  getAllProd,
  getProd,
};
