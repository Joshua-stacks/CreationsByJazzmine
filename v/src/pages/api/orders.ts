import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new MongoClient(MONGO_URI);

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
    console.error("Error getting orders:", err);
    return res.status(500).json({
      status: 500,
      message: "An unknown error occurred.",
    });
  } finally {
    client.close();
  }
}
