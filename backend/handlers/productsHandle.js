// Require MongoDB related functions.
const { MongoClient, ObjectId } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Set MongoDB options.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get all products
const getAllProd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
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
    console.error("Error fetching products:", err);
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
  const client = new MongoClient(MONGO_URI, options);
  //Get the item by _id
  const prod = req.params._id;
  try {
    await client.connect();
    const db = client.db("Project");
    const product = await db
      .collection("Product")
      .findOne({ _id: ObjectId(prod) });
    return res
      .status(200)
      .json({ status: 200, product: product, message: "Product selected" });
  } catch (err) {
    console.error("Error fetching product:", err);
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
