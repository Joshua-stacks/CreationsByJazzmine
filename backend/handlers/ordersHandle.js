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

// Get all Orders
const getAllOrders = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Project");
    const result = await db.collection("Orders").find().toArray();
    return res.status(200).json({
      status: 200,
      products: result,
      message: "These are all the orders",
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

//Get one Order
const getOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //Get the order by _id
  const ord = req.params._id;
  try {
    await client.connect();
    const db = client.db("Project");
    const order = await db.collection("Orders").findOne({ _id: ObjectId(ord) });
    return res
      .status(200)
      .json({ status: 200, order: order, message: "Order selected" });
  } catch (err) {
    console.error("Error fetching order:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  getAllOrders,
  getOrder,
};
