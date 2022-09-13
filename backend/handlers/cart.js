// Require MongoDB related functions.
const { MongoClient, ObjectId } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Set MongoDB options.
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a cart for the client.
const createCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, mongoOptions);

  try {
    await client.connect();
    const carts = client.db("Project").collection("Carts");

    // Check if the client already has a cart.
    if (req.cookies["cartId"]) {
      const cartId = ObjectId(req.cookies["cartId"]);

      // Fetch the cart from the database.
      const cart = await carts.findOne({ _id: cartId });

      return res.status(200).json({ status: 200, data: cart.items });
    }

    // Create the cart.
    const response = await carts.insertOne({});

    // Verify that the cart was created successfully.
    if (response.insertedId) {
      // Send a cookie with the cart's id.
      res.cookie("cartId", response.insertedId, {
        httpOnly: true,
        secure: true,
      });

      return res.status(201).json({ status: 201 });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Cart creation failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error creating cart:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

module.exports = { createCart };
