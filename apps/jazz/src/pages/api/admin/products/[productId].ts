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
    const { productId } = req.query;

    try {
      await client.connect();
      const products = client.db('Project').collection('Product');

      // Verify that the product exists.
      const product = await products.findOne({
        _id: new ObjectId(productId as string),
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: 'No product found.',
          data: { productId },
        });
      }

      // Set arguments for update.
      const query = { _id: new ObjectId(productId as string) };
      const patch = { $set: { ...req.body } };

      // Verify that the update was successful.
      const response = await products.updateOne(query, patch);

      if (response.modifiedCount) {
        return res.status(200).json({
          status: 200,
          data: { ...product, ...req.body },
        });
      } else {
        // Mongo failed to update, throw a generic error.
        return res.status(502).json({
          status: 502,
          message: 'Update failed, please try again.',
        });
      }
    } catch (err) {
      console.error('Error updating product:', err);

      switch ((err as any).name) {
        // Id provided is not a valid ObjectId.
        case 'BSONTypeError':
          return res.status(400).json({
            status: 400,
            message: 'Invalid id provided.',
            data: { productId },
          });

        default:
          return res.status(500).json({
            status: 500,
            message: 'An unknown error occurred.',
            data: { productId },
          });
      }
    } finally {
      client.close();
    }
  } else if (req.method === 'DELETE') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { productId } = req.query;

    try {
      await client.connect();
      const products = client.db('Project').collection('Product');

      // Delete the specified product by id.
      const response = await products.deleteOne({
        _id: new ObjectId(productId as string),
      });

      // Verify that the product was deleted.
      if (response.deletedCount) {
        return res.status(204).json({ status: 204 });
      } else {
        return res.status(502).json({
          status: 502,
          message: 'Deletion failed, please try again.',
        });
      }
    } catch (err) {
      console.error('Error deleting product:', err);

      switch ((err as any).name) {
        // Id provided is not a valid ObjectId.
        case 'BSONTypeError':
          return res.status(400).json({
            status: 400,
            message: 'Invalid id provided.',
            data: { productId },
          });

        default:
          return res.status(500).json({
            status: 500,
            message: 'An unknown error occurred.',
            data: { productId },
          });
      }
    } finally {
      client.close();
    }
  }
}
