import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { setCookie } from '@/utils/cookies';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = new MongoClient(MONGO_URI);

    try {
      await client.connect();
      const carts = client.db('Project').collection('Carts');
      const cartIdCookie = req.cookies['cartId'];

      // Check if the client already has a cart.
      if (cartIdCookie) {
        const cartId = new ObjectId(cartIdCookie);

        // Fetch the cart from the database.
        const cart = await carts.findOne({ _id: cartId });

        // Verify that the cart was found.
        if (cart) {
          return res.status(200).json({
            status: 200,
            data: cart.items,
          });
        } else {
          return res.status(404).json({
            status: 404,
            message: 'Cart not found.',
          });
        }
      }

      // Create the cart.
      const response = await carts.insertOne({ items: [] });

      // Verify that the cart was created successfully.
      if (response.insertedId) {
        // Send a cookie with the cart's id.
        setCookie(res, 'cartId', response.insertedId.toString(), {
          httpOnly: true,
          // Set the cookie to expire in a decade.
          maxAge: 10 * 365 * 86400 * 1000,
          secure: true,
        });

        return res.status(201).json({ status: 201 });
      } else {
        return res.status(502).json({
          status: 502,
          message: 'Creation failed, please try again.',
        });
      }
    } catch (err) {
      console.error('Error getting cart:', err);
      return res.status(500).json({
        status: 500,
        message: 'An unknown error occurred.',
      });
    } finally {
      client.close();
    }
  }
}
