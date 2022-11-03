import { NextApiResponse, NextApiRequest } from 'next'
import { MongoClient } from 'mongodb';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { category, image_src, max, min, name, options, price } = req.body;

    // If any values are missing respond with a bad request.
    if (!category || !max || !min || !name || !options || !price) {
      return res.status(400).json({
        status: 400,
        message: "Request is missing data.",
      });
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
          message: "Creation failed, please try again.",
          data: { ...newProduct },
        });
      }
    } catch (err) {
      console.error("Error creating product:", err);
      return res.status(500).json({
        status: 500,
        message: "An unknown error occured.",
      });
    } finally {
      client.close();
    }
  }
}
