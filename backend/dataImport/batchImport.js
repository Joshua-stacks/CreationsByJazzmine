const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { PRODUCTS } = require("./data");

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("Project");
    console.log("connected!");
    await db.collection("Product").insertMany(PRODUCTS);
    console.log("success 1");
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
