// Require MongoDB related functions.
const { MongoClient } = require("mongodb");

// Require environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Require bcrypt for password encryption.
const bcrypt = require("bcrypt");

// Set MongoDB options.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Change the user's password.
const changePassword = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

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

// Log the user in given username and password.
const login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

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
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

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

module.exports = { changePassword, login };
