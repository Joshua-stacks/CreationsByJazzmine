# Endpoints

Endpoints are grouped in the following categories:

- **administrator** - relating to admin accounts and functions
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
