// Require MongoDB related functions.
const { MongoClient, ObjectId } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Require helper functions.
const { compareObjects } = require("../helpers/objects");

// Set MongoDB options.
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Add an item to the cart.
const addItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, mongoOptions);

  // Extract the required details from the request.
  const { count, item } = req.body;

  try {
    await client.connect();
    const carts = client.db("Project").collection("Carts");

    // Verify that the client has a cart.
    const cartId = req.cookies["cartId"];
    if (!cartId) {
      return res.status(400).json({
        status: 400,
        message: "Client does not have a cart.",
      });
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found.",
      });
    }

    // Add the item into the items array.
    const items = [...cart.items, { item, count }];

    // Setup arguments for update.
    const query = { _id: ObjectId(cartId) };
    const patch = { $set: { items } };

    // Update the cart on Mongo.
    const response = await carts.updateOne(query, patch);

    // Verify that the update was successful.
    if (response.modifiedCount) {
      return res.status(200).json({
        status: 200,
        data: items,
      });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Update failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error adding item to cart:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

// Get the client's cart, or create one if it doesn't exist.
const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, mongoOptions);

  try {
    await client.connect();
    const carts = client.db("Project").collection("Carts");

    // Check if the client already has a cart.
    if (req.cookies["cartId"]) {
      const cartId = ObjectId(req.cookies["cartId"]);

      // Fetch the cart from the database.
      const cart = await carts.findOne({ _id: cartId });

      // Verify that the cart was found.
      if (cart) {
        return res.status(200).json({
          status: 200,
          data: cart.items,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Cart not found.",
        });
      }
    }

    // Create the cart.
    const response = await carts.insertOne({ items: [] });

    // Verify that the cart was created successfully.
    if (response.insertedId) {
      // Send a cookie with the cart's id.
      res.cookie("cartId", response.insertedId, {
        httpOnly: true,
        // Set the cookie to expire in a decade.
        maxAge: 10 * 365 * 86400 * 1000,
        secure: true,
      });

      return res.status(201).json({ status: 201 });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Creation failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error getting cart:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

// Update an item's quantity in the cart.
const updateItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, mongoOptions);

  // Extract the required details from the request.
  const { count, item } = req.body;

  try {
    await client.connect();
    const carts = client.db("Project").collection("Carts");

    // Verify that the client has a cart.
    const cartId = req.cookies["cartId"];
    if (!cartId) {
      return res.status(400).json({
        status: 400,
        message: "Client does not have a cart.",
      });
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found.",
      });
    }

    // Update the item's quantity in the items array.
    const items = cart.items.map((element) => {
      if (!compareObjects(element.item, item)) {
        return element;
      } else {
        // If the item matches the item set for update then return the item with the new count.
        return { item, count };
      }
    });

    // Setup arguments for update.
    const query = { _id: ObjectId(cartId) };
    const patch = { $set: { items } };

    // Update the cart on Mongo.
    const response = await carts.updateOne(query, patch);

    // Verify that the update was successful.
    if (response.modifiedCount) {
      return res.status(200).json({ status: 200, data: items });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Update failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error updating item:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occured.",
    });
  } finally {
    client.close();
  }
};

// Delete an item from the cart.
const deleteItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, mongoOptions);

  // Extract the required details from the request.
  const { item } = req.body;

  try {
    await client.connect();
    const carts = client.db("Project").collection("Carts");

    // Verify that the client has a cart.
    const cartId = req.cookies["cartId"];
    if (!cartId) {
      return res.status(400).json({
        status: 400,
        message: "Client does not have a cart.",
      });
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found.",
      });
    }

    // Remove the item to be deleted from the items array.
    const items = cart.items.filter((element) => {
      return !compareObjects(element.item, item);
    });

    // Setup arguments for update.
    const query = { _id: ObjectId(cartId) };
    const patch = { $set: { items } };

    // Update the cart on Mongo.
    const response = await carts.updateOne(query, patch);

    // Verify that the update was successful.
    if (response.modifiedCount) {
      return res.status(200).json({ status: 200, data: items });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Update failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occured.",
    });
  } finally {
    client.close();
  }
};

module.exports = { addItem, getCart, updateItem, deleteItem };
