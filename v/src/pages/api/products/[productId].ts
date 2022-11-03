import * as Realm from "realm-web";
import * as utils from "../../utils";

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

    //Get the item by _id
    const { searchParams } = new URL(request.url)
    const prod = searchParams.get('productId')

    const product = client.db("Project")
      .collection("Product")
      .findOne({ _id: new ObjectId(prod) });

    // Verify that the product was found.
    if (product) {
      return utils.toJSON({
        product,
        message: "Product selected",
      });
    } else {
      return utils.toJSON({
        message: "No product found.",
      }, 404);
    }
  } catch (err) {
    console.error("Error getting product:", err);
    return utils.toJSON({
      message: "An unknown error occurred.",
    }, 500);
  }
};
