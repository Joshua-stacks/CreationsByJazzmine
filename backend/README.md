# Endpoints

Endpoints are grouped in the following categories:

- **administrator** - relating to admin accounts and functions
- **cart** - relating to customer carts
- **order** - relating to customer orders
- **product** - relating to available products

## Administrator Endpoints

### POST /api/admin/login

Log a user in given username and password.

Expects a body with the following structure:

```json
{
  "username": "<username>",
  "password": "<password>"
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": {
    "_id": "62ed7a9decd60c19d0a0c6e4",
    "username": "Jazzmine"
  }
}
```

### PATCH /api/admin/account

Change the user's password.

Expects a body with the following structure:

```json
{
  "username": "<username>",
  "oldPassword": "<current password>",
  "newPassword": "<new password>"
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": {
    "username": "Jazzmine"
  }
}
```

### POST /api/admin/products

Create a new product in the database.

Expects a body with the following structure:

```json
{
  "name": "<name>",
  "category": "<category>",
  "price": 24,
  "image_src": "<image location>",
  "min": 1,
  "max": 10,
  "options": {
    "<option name>": ["<selection>", "<selection>", "<...>"]
  }
}
```

Response will be in this structure:

```json
{
  "status": 201,
  "message": "If a message is required it will be here.",
  "data": {
    "_id": "63188924249fa329d91e0f78",
    "name": "Cake Topper",
    "category": "Toppers",
    "price": 24,
    "image_src": "/assets/cake-topper.jpg",
    "min": 1,
    "max": 10,
    "options": {
      "color": ["blue", "green"]
    }
  }
}
```

### DELETE /api/admin/products/:id

Delete a specified product in the database by id.

Response will be in this structure:

```json
{
  "status": 204,
  "message": "If a message is required it will be here."
}
```

### PATCH /api/admin/products/:id

Update a specified product in the database by id.

Expects a body with the following structure, keys can be omitted if they are not being changed:

```json
{
  "name": "Basic Cake Topper",
  "category": "Toppers",
  "price": 15,
  "image_src": "/assets/CakeTopper.jpg",
  "min": 1,
  "max": 10,
  "options": {
    "color": ["blue", "white", "black"]
  }
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": {
    "_id": "6317c20ba45f837cfa3cf71e",
    "name": "Basic Cake Topper",
    "category": "Toppers",
    "price": 15,
    "image_src": "/assets/CakeTopper.jpg",
    "min": 1,
    "max": 10,
    "options": {
      "color": ["blue", "white", "black"]
    }
  }
}
```

## Cart Endpoints

### GET /api/cart

Get the customer's cart, or create it if they don't have one.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "itemId": "63209c1c7e7c76941e32f1d0",
      "count": 3
    },
    {
      "itemId": "63209c1c7e7c76941e32fsd",
      "count": 5
    }
  ]
}
```

### POST /api/cart/client

Add an item to the customer's cart.

Expects a body with the following structure:

```json
{
  "itemId": "<id of the item to be added>",
  "count": "<amount to add>"
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "itemId": "63209c1c7e7c76941e32f1d0",
      "count": 3
    },
    {
      "itemId": "63209c1c7e7c76941e32fsd",
      "count": 5
    },
    {
      "itemId": "63209c1c7e7c7698s432fsd",
      "count": 1
    }
  ]
}
```

### DELETE /api/cart/client

Remove an item from the customer's cart.

Expects a body with the following structure:

```json
{
  "itemId": "<id of the item to be removed>"
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "itemId": "63209c1c7e7c76941e32f1d0",
      "count": 3
    },
    {
      "itemId": "63209c1c7e7c7698s432fsd",
      "count": 1
    }
  ]
}
```

## Order Endpoints

### GET /api/orders

Get all the orders in the database.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "These are all the orders",
  "orders": [
    {
      "_id": "6316f335c2031e209805f362",
      "name": "john",
      "lastname": "placeholder"
    }
  ]
}
```

### GET /api/order/:id

Get an order by specified id in the database.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "Order selected",
  "order": {
    "_id": "6316f335c2031e209805f362",
    "name": "john",
    "lastname": "placeholder"
  }
}
```

## Product Endpoints

### GET /api/products

Get all the available products.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "These are all the products",
  "products": [
    {
      "_id": "631660ab7647ae60f91da0b9",
      "name": "Shaker Cake Topper",
      "category": "Cake Topper",
      "price": 30,
      "image_src": "/assets/ShakerCakeTopper.jpg",
      "min": 1,
      "max": 10,
      "options": {
        "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
        "ledLight": false
      }
    }
  ]
}
```

### GET /api/product/:id

Get a single product by id.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "Product selected",
  "product": {
    "_id": "631660ab7647ae60f91da0b9",
    "name": "Shaker Cake Topper",
    "category": "Cake Topper",
    "price": 30,
    "image_src": "/assets/ShakerCakeTopper.jpg",
    "min": 1,
    "max": 10,
    "options": {
      "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
      "ledLight": false
    }
  }
}
```
