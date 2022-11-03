import { NextApiResponse, NextApiRequest } from 'next'
import { MongoClient, ObjectId } from 'mongodb';
import { compareObjects } from '@/utils/compare';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { count, item } = req.body;

    try {
      await client.connect();
      const carts = client.db("Project").collection("Carts");

      // Verify that the client has a cart.
      const cartId = req.cookies["cartId"];
      if (!cartId) {
        return res.status(400).json({
          status: 400,
          message: "Client does not have a cart.",
        });
      }

      // Fetch the client's cart from the database.
      const cart = await carts.findOne({ _id: new ObjectId(cartId) });

      // Verify that the cart was found.
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found.",
        });
      }

      // Add the item into the items array.
      const items = [...cart.items, { item, count }];

      // Setup arguments for update.
      const query = { _id: new ObjectId(cartId) };
      const patch = { $set: { items } };

      // Update the cart on Mongo.
      const response = await carts.updateOne(query, patch);

      // Verify that the update was successful.
      if (response.modifiedCount) {
        return res.status(200).json({
          status: 200,
          data: items,
        });
      } else {
        return res.status(502).json({
          status: 502,
          message: "Update failed, please try again.",
        });
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
      return res.status(500).json({
        status: 500,
        message: "An unknown error occurred.",
      });
    } finally {
      client.close();
    }
  } else if (req.method === 'DELETE') {

    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { item } = req.body;

    try {
      await client.connect();
      const carts = client.db("Project").collection("Carts");

      // Verify that the client has a cart.
      const cartId = req.cookies["cartId"];
      if (!cartId) {
        return res.status(400).json({
          status: 400,
          message: "Client does not have a cart.",
        });
      }

      // Fetch the client's cart from the database.
      const cart = await carts.findOne({ _id: new ObjectId(cartId) });

      // Verify that the cart was found.
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found.",
        });
      }

      // Remove the item to be deleted from the items array.
      const items = cart.items.filter((element: any) => {
        return !compareObjects(element.item, item);
      });

      // Setup arguments for update.
      const query = { _id: new ObjectId(cartId) };
      const patch = { $set: { items } };

      // Update the cart on Mongo.
      const response = await carts.updateOne(query, patch);

      // Verify that the update was successful.
      if (response.modifiedCount) {
        return res.status(200).json({ status: 200, data: items });
      } else {
        return res.status(502).json({
          status: 502,
          message: "Update failed, please try again.",
        });
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      return res.status(500).json({
        status: 500,
        message: "An unknown error occured.",
      });
    } finally {
      client.close();
    }

  } else if (req.method === 'PATCH') {
    const client = new MongoClient(MONGO_URI);

    // Extract the required details from the request.
    const { count, item } = req.body;

    try {
      await client.connect();
      const carts = client.db("Project").collection("Carts");

      // Verify that the client has a cart.
      const cartId = req.cookies["cartId"];
      if (!cartId) {
        return res.status(400).json({
          status: 400,
          message: "Client does not have a cart.",
        });
      }

      // Fetch the client's cart from the database.
      const cart = await carts.findOne({ _id: new ObjectId(cartId) });

      // Verify that the cart was found.
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found.",
        });
      }

      // Update the item's quantity in the items array.
      const items = cart.items.map((element: any) => {
        if (!compareObjects(element.item, item)) {
          return element;
        } else {
          // If the item matches the item set for update then return the item with the new count.
          return { item, count };
        }
      });

      // Setup arguments for update.
      const query = { _id: new ObjectId(cartId) };
      const patch = { $set: { items } };

      // Update the cart on Mongo.
      const response = await carts.updateOne(query, patch);

      // Verify that the update was successful.
      if (response.modifiedCount) {
        return res.status(200).json({ status: 200, data: items });
      } else {
        return res.status(502).json({
          status: 502,
          message: "Update failed, please try again.",
        });
      }
    } catch (err) {
      console.error("Error updating item:", err);
      return res.status(500).json({
        status: 500,
        message: "An unknown error occured.",
      });
    } finally {
      client.close();
    }
  }
}
