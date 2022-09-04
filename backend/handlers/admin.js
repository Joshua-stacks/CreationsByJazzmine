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

// Log the user in given username and password.
const login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // Extract the login details from the request.
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
    const accounts = client.db("master").collection("admin-accounts");

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

      return res.status(200).json({ status: 200, data: { user: clone } });
    }
  } catch (err) {
    console.error("Error logging in: ", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  }
};

module.exports = { login };
