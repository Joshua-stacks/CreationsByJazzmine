import { NextApiResponse, NextApiRequest } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

const { MONGO_URI } = process.env;

// Set MongoDB options.
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiRequest
) {
  if (req.method === 'GET') {
    const client = new MongoClient(MONGO_URI, mongoOptions);

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
      const cart = await carts.findOne({ _id: ObjectId(cartId) });

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
      const query = { _id: ObjectId(cartId) };
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
  }
}

export const onRequestGet: PagesFunction<Bindings> = async (context) => {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const App = new Realm.App(env.REALM_APPID);
  const ObjectId = Realm.BSON.ObjectID;

  const token = request.headers.get("authorization");
  if (!token)
    return utils.toError(
      'Missing "authorization" header; try to add the header "authorization: REALM_API_KEY".',
      401
    );

  try {
    const credentials = Realm.Credentials.apiKey(token);

    // Attempt to authenticate
    const user = await App.logIn(credentials);
    const client = user.mongoClient("mongodb-atlas");

    const carts = client.db("Project").collection<Cart>("Carts");
    const cookieObj = cookie.parse(request.headers.get("Cookie") || "");

    // Check if the client already has a cart.
    if (cookieObj["cartId"]) {
      const cartId = new ObjectId(cookieObj["cartId"]);

      // Fetch the cart from the database.
      const cart = await carts.findOne({ _id: cartId });

      // Verify that the cart was found.
      if (cart) {
        return utils.toJSON({
          data: cart.items,
        });
      } else {
        return utils.toJSON(
          {
            message: "Cart not found.",
          },
          404
        );
      }
    }

    // Create the cart.
    const result = await carts.insertOne({ items: [] });

    // Verify that the cart was created successfully.
    if (result.insertedId) {
      const response = utils.toJSON(
        {
          message: "Cart created successfully",
        },
        201
      );

      // Send a cookie with the cart's id.
      response.headers.set(
        "Set-Cookie",
        cookie.serialize("cartId", String(result.insertedId), {
          httpOnly: true,
          // Set the cookie to expire in a decade.
          maxAge: 10 * 365 * 86400 * 1000,
          secure: true,
        })
      );

      return response;
    } else {
      return utils.toJSON(
        {
          message: "Creation failed, please try again.",
        },
        502
      );
    }
  } catch (err) {
    return utils.toError("Error with authentication.", 500);
  }
};
