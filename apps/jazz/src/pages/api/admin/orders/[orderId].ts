import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { orderId } = req.query;
    const { status } = req.body;

    // If any details are missing respond with a bad request.
    if (!status) {
      return res.status(400).json({
        status: 400,
        message: 'Request is missing data.',
      });
    }

    try {
      await client.connect();
      const orders = client.db('Project').collection('Orders');

      // Setup arguments for update.
      const query = { _id: new ObjectId(orderId as string) };
      const patch = { $set: { status } };

      // Verify that the update was successful.
      const response = await orders.updateOne(query, patch);

      if (!response.matchedCount) {
        // Order with given id does not exist.
        return res.status(404).json({
          status: 404,
          message: 'No order found.',
        });
      } else if (!response.modifiedCount) {
        // Mongo failed to update the order.
        return res.status(502).json({
          status: 502,
          message: 'Update failed, or nothing was changed.',
          data: { status },
        });
      } else {
        return res.status(200).json({
          status: 200,
          data: { status },
        });
      }
    } catch (err) {
      switch ((err as any).name) {
        // An invalid order id was provided.
        case 'BSONTypeError':
          return res.status(400).json({
            status: 400,
            message: 'Invalid order id provided.',
          });

        default:
          console.error('Error updating order:', err);
          return res.status(500).json({
            status: 500,
            message: 'An unknown error occurred',
          });
      }
    } finally {
      client.close();
    }
  } else if (req.method === 'DELETE') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { orderId } = req.query;

    try {
      await client.connect();
      const orders = client.db('Project').collection('Orders');

      // Delete the specified order by id.
      const response = await orders.deleteOne({
        _id: new ObjectId(orderId as string),
      });

      // Verify that the order was deleted.
      if (response.deletedCount) {
        return res.status(204).json({ status: 204 });
      } else {
        return res.status(502).json({
          status: 502,
          message: 'Deletion failed, please try again.',
          data: { orderId },
        });
      }
    } catch (err) {
      switch ((err as any).name) {
        // An invalid order id was provided.
        case 'BSONTypeError':
          return res.status(400).json({
            status: 400,
            message: 'Invalid order id provided.',
          });

        default:
          console.error('Error deleting order:', err);
          return res.status(500).json({
            status: 500,
            message: 'An unknown error occurred',
          });
      }
    } finally {
      client.close();
    }
  }
}
