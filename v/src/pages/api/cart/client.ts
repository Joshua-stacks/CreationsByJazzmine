import * as Realm from "realm-web";
import * as cookie from "cookie";
import * as utils from "../../utils";

export const onRequestPost: PagesFunction<Bindings> = async (context) => {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  const { count, item } = await request.json<Item>();

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

    // Verify that the client has a cart.
    const cartId = cookieObj["cartId"];
    if (!cartId) {
      return utils.toJSON(
        {
          message: "Client does not have a cart.",
        },
        400
      );
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: new ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return utils.toJSON(
        {
          message: "Cart not found.",
        },
        404
      );
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
      return utils.toJSON(
        {
          data: items,
        },
        200
      );
    } else {
      return utils.toJSON(
        {
          message: "Update failed, please try again.",
        },
        502
      );
    }
  } catch (err) {
    console.error("Error adding item to cart:", err);
    return utils.toJSON(
      {
        message: "An unknown error occurred.",
      },
      500
    );
  }
};

export const onRequestPatch: PagesFunction<Bindings> = async (context) => {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  const { count, item } = await request.json<Item>();
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
    // Verify that the client has a cart.
    const cartId = cookieObj["cartId"];
    if (!cartId) {
      return utils.toJSON(
        {
          message: "Client does not have a cart.",
        },
        400
      );
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: new ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return utils.toJSON(
        {
          message: "Cart not found.",
        },
        404
      );
    }
    // Update the item's quantity in the items array.
    const items = cart.items.map((element) => {
      if (!utils.compareObjects(element.item, item)) {
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
      return utils.toJSON(
        {
          data: items
        },
        200
      );
    } else {
      return utils.toJSON(
        {
          message: "Update failed, please try again.",
        },
        502
      );
    }
  } catch (err) {
    console.error("Error updating item:", err);
    return utils.toJSON(
      {
        message: "An unknown error occured.",
      },
      500
    );
  }
};

export const onRequestDelete: PagesFunction<Bindings> = async (context) => {
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

    const { item } = await request.json<{ item: Item }>();

    // Verify that the client has a cart.
    const cartId = cookieObj["cartId"];
    if (!cartId) {
      return utils.toJSON({
        message: "Client does not have a cart.",
      }, 400);
    }

    // Fetch the client's cart from the database.
    const cart = await carts.findOne({ _id: new ObjectId(cartId) });

    // Verify that the cart was found.
    if (!cart) {
      return utils.toJSON({
        message: "Cart not found.",
      }, 404);
    }

    // Remove the item to be deleted from the items array.
    const items = cart.items.filter((element) => {
      return !utils.compareObjects(element.item, item);
    });

    // Setup arguments for update.
    const query = { _id: new ObjectId(cartId) };
    const patch = { $set: { items } };

    // Update the cart on Mongo.
    const response = await carts.updateOne(query, patch);

    // Verify that the update was successful.
    if (response.modifiedCount) {
      return utils.toJSON({
        data: items
      }, 200);
    } else {
      return utils.toJSON({
        message: "Update failed, please try again.",
      }, 502);
    }
  } catch (err) {
    console.error("Error deleting item:", err);

    return utils.toJSON({
      message: "An unknown error occured.",
    }, 500);
  }
};
