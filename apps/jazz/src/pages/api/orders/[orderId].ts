import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = new MongoClient(MONGO_URI);

    // Extract the order id from the request.
    const ord = req.query.orderId;

    try {
      await client.connect();
      const db = client.db('Project');

      // Fetch the order from the database by id.
      const order = await db
        .collection('Orders')
        .findOne({ _id: new ObjectId(ord as string) });

      // Verify that the order was found.
      if (order) {
        return res.status(200).json({
          status: 200,
          order: order,
          message: 'Order selected',
        });
      } else {
        // If no order was found respond with a 404.
        return res.status(404).json({
          status: 404,
          message: 'No order found.',
        });
      }
    } catch (err) {
      console.error('Error getting order:', err);
      return res.status(500).json({
        status: 500,
        message: 'An unknown error occurred.',
      });
    } finally {
      client.close();
    }
  }
}
