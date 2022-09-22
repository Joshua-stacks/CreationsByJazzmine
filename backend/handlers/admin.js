// Require MongoDB related functions.
const { MongoClient, ObjectId } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Require bcrypt for password encryption.
const bcrypt = require("bcrypt");

// Set MongoDB parameters.
const parameters = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Change the user's password.
const changePassword = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);

  // Extract the required details from the request.
  const { username, oldPassword, newPassword } = req.body;

  // If any details are missing respond with a bad request.
  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({
      status: 400,
      message: "Request is missing data.",
    });
  }

  try {
    await client.connect();
    const accounts = client.db("Project").collection("Administrators");

    // Get the specific user by username.
    const user = accounts.findOne({ username });

    // Verify that the user exists.
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No user found.",
        data: { username },
      });
    }

    // Verify that the password entered is correct.
    const isPasswordCorrect = bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect password provided.",
      });
    }

    // Request has passed every test, update the password.
    const hash = await bcrypt.hash(newPassword, 10);

    // Setup arguments for update.
    const query = { _id: user._id };
    const patch = { $set: { password: hash } };

    const response = await accounts.updateOne(query, patch);

    // Verify that the update was successful.
    if (response.modifiedCount) {
      return res.status(200).json({
        status: 200,
        data: { username },
      });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Update failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error changing password:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

// Create a new product.
const createProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);

  // Extract the required details from the request.
  const { category, image_src, max, min, name, options, price } = req.body;

  // If any values are missing respond with a bad request.
  if (!category || !max || !min || !name || !options || !price) {
    return res
      .status(400)
      .json({ status: 400, message: "Request is missing data." });
  }

  // Set the new product object to be inserted.
  const newProduct = { name, category, price, image_src, min, max, options };

  try {
    await client.connect();
    const products = client.db("Project").collection("Product");

    // Insert the new product into the database.
    const response = await products.insertOne(newProduct);

    // Verify that the product insertion was successful.
    if (response.insertedId) {
      return res.status(201).json({ status: 201, data: { ...newProduct } });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Something went wrong, please try again.",
        data: { ...newProduct },
      });
    }
  } catch (err) {
    console.error("Error occurred creating product:", err);
    return res
      .status(500)
      .json({ status: 500, message: "An unknown error occured." });
  } finally {
    client.close();
  }
};

// Delete a product.
const deleteProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);

  // Extract the required details from the request.
  const { _id } = req.params;

  try {
    await client.connect();
    const products = client.db("Project").collection("Product");

    // Delete the specified product by id.
    const response = await products.deleteOne({ _id: ObjectId(_id) });

    // Verify that the product was deleted.
    if (response.deletedCount) {
      return res.status(204).json({ status: 204 });
    } else {
      return res.status(502).json({
        status: 502,
        message: "Deletion failed, please try again.",
      });
    }
  } catch (err) {
    console.error("Error deleting product:", err);

    switch (err.name) {
      // Id provided is not a valid ObjectId.
      case "BSONTypeError":
        return res.status(400).json({
          status: 400,
          message: "Invalid id provided.",
          data: { _id },
        });

      default:
        return res.status(500).json({
          status: 500,
          message: "An unknown error occurred.",
          data: { _id },
        });
    }
  } finally {
    client.close();
  }
};

// Log the administrator in given username and password.
const login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);

  // Check if the user is already logged in.
  if (req.cookies["isAdmin"] === true) {
    return res.status(200).json({ status: 200 });
  }

  // Extract the required details from the request.
  const { username, password } = req.body;

  // If either value is missing respond with a bad request.
  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "Request is missing data.",
    });
  }

  try {
    await client.connect();
    const accounts = client.db("Project").collection("Administrators");

    // Get the specific user by username.
    const user = await accounts.findOne({ username });

    // Verify that the user attempting to sign in exists.
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No user found.",
        data: { username },
      });
    }

    // Verify that the password entered is correct.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect password provided.",
        data: { username },
      });
    } else {
      // Remove the password from the response.
      const clone = { ...user };
      delete clone.password;

      // Send a cookie so the user does not need to re-enter their credentials.
      res.cookie("isAdmin", true, {
        maxAge: 86400 * 1000, // Cookie will timeout after 24hrs.
        httpOnly: true,
        secure: true,
      });

      return res.status(200).json({
        status: 200,
        data: { user: clone },
      });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
};

// Update an existing product.
const updateProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI, parameters);

  // Extract the required details from the request.
  const { _id } = req.params;

  try {
    await client.connect();
    const products = client.db("Project").collection("Product");

    // Verify that the product exists.
    const product = await products.findOne({ _id: ObjectId(_id) });

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "No product found.", data: { _id } });
    }

    // Set arguments for update.
    const query = { _id: ObjectId(_id) };
    const patch = { $set: { ...req.body } };

    // Verify that the update was successful.
    const response = await products.updateOne(query, patch);

    if (response.modifiedCount) {
      return res
        .status(200)
        .json({ status: 200, data: { ...product, ...req.body } });
    } else {
      // Mongo failed to update, throw a generic error.
      return res
        .status(502)
        .json({ status: 502, message: "Update failed, please try again." });
    }
  } catch (err) {
    console.error("Error occurred updating product:", err);

    switch (err.name) {
      // Id provided is not a valid ObjectId.
      case "BSONTypeError":
        return res.status(400).json({
          status: 400,
          message: "Invalid id provided.",
          data: { _id },
        });

      default:
        return res.status(500).json({
          status: 500,
          message: "An unknown error occurred.",
          data: { _id },
        });
    }
  } finally {
    client.close();
  }
};

module.exports = {
  changePassword,
  createProduct,
  deleteProduct,
  login,
  updateProduct,
};
