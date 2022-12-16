import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = new MongoClient(MONGO_URI);

    //Get the item by _id
    const prod = req.query.productId;
    try {
      await client.connect();
      const db = client.db('Project');
      // TODO: fix as hack
      const product = await db
        .collection('Product')
        .findOne({ _id: new ObjectId(prod as string) });

      // Verify that the product was found.
      if (product) {
        return res.status(200).json({
          status: 200,
          product: product,
          message: 'Product selected',
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: 'No product found.',
        });
      }
    } catch (err) {
      console.error('Error getting product:', err);
      return res.status(500).json({
        status: 500,
        message: 'An unknown error occurred.',
      });
    } finally {
      client.close();
    }
  }
}
