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

    // Fetch the orders from the database.
    const result = await db.collection("Orders").find().toArray();

    // Verify that the orders were found before responding.
    if (result) {
      return res.status(200).json({
        status: 200,
        orders: result,
        message: "These are all the orders",
      });
    }
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

  // Extract the order id from the request.
  const ord = req.params._id;

  try {
    await client.connect();
    const db = client.db("Project");

    // Fetch the order from the database by id.
    const order = await db.collection("Orders").findOne({ _id: ObjectId(ord) });

    // Verify that the order was found.
    if (order) {
      return res
        .status(200)
        .json({ status: 200, order: order, message: "Order selected" });
    } else {
      // If no order was found respond with a 404.
      return res.status(404).json({ status: 404, message: "No order found." });
    }
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
