import { NextApiResponse, NextApiRequest } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = new MongoClient(MONGO_URI);
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
      console.error("Error getting products:", err);
      return res.status(500).json({
        status: 500,
        message: "An unknown error occurred.",
      });
    } finally {
      client.close();
    }
  }
}
