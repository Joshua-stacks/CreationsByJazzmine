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

### PATCH /api/admin/products/:productId

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

### DELETE /api/admin/products/:productId

Delete a specified product in the database by id.

Response will be in this structure:

```json
{
  "status": 204,
  "message": "If a message is required it will be here."
}
```

### PATCH /api/admin/orders/:orderId

Update an order in the database by id.

Expects a body with the following structure:

```json
{
  "status": "<order status>"
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": {
    "status": "Delivered"
  }
}
```

### DELETE /api/admin/orders/:orderId

Delete an order in the database by id.

Response will be in this structure:

```json
{
  "status": 204,
  "message": "If a message is required it will be here.",
  "data": {
    "orderId": "631ba50bbf1ef0b0bb4341e4"
  }
}
```

## Cart Endpoints

### POST /api/cart/client

Add an item to the customer's cart.

Expects a body with the following structure:

```json
{
  "count": "<amount to add>",
  "item": {
    "name": "<item name>",
    "category": "<item category>",
    "price": 25,
    "image_src": "<item image url>",
    "min": 1,
    "max": 10,
    "options": {
      "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
    }
  }
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "count": 3,
      "item": {
        "name": "3D Cake Topper",
        "category": "Toppers",
        "price": 25,
        "image_src": "/assets/3DCakeTopper.jpg",
        "min": 1,
        "max": 10,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    },
    {
      "count": 1,
      "item": {
        "name": "Montly Banner",
        "category": "Banners",
        "price": 30,
        "image_src": "/assets/montlyBanner.jpg",
        "min": 1,
        "max": 5,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    }
  ]
}
```

### GET /api/cart

Get the customer's cart, or create it if they don't have one.

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "count": 3,
      "item": {
        "name": "3D Cake Topper",
        "category": "Toppers",
        "price": 25,
        "image_src": "/assets/3DCakeTopper.jpg",
        "min": 1,
        "max": 10,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    },
    {
      "count": 1,
      "item": {
        "name": "Montly Banner",
        "category": "Banners",
        "price": 30,
        "image_src": "/assets/montlyBanner.jpg",
        "min": 1,
        "max": 5,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    }
  ]
}
```

### PATCH /api/cart/client

Update an item's count in the customer's cart.

Expects a body with the following structure:

```json
{
  "count": "<new count of the item>",
  "item": {
    "name": "<item name>",
    "category": "<item category>",
    "price": 25,
    "image_src": "<item image url>",
    "min": 1,
    "max": 10,
    "options": {
      "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
    }
  }
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "count": 3,
      "item": {
        "name": "3D Cake Topper",
        "category": "Toppers",
        "price": 25,
        "image_src": "/assets/3DCakeTopper.jpg",
        "min": 1,
        "max": 10,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    },
    {
      "count": 1,
      "item": {
        "name": "Montly Banner",
        "category": "Banners",
        "price": 30,
        "image_src": "/assets/montlyBanner.jpg",
        "min": 1,
        "max": 5,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
    }
  ]
}
```

### DELETE /api/cart/client

Remove an item from the customer's cart.

Expects a body with the following structure:

```json
{
  "item": {
    "name": "<item name>",
    "category": "<item category>",
    "price": 25,
    "image_src": "<item image url>",
    "min": 1,
    "max": 10,
    "options": {
      "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
    }
  }
}
```

Response will be in this structure:

```json
{
  "status": 200,
  "message": "If a message is required it will be here.",
  "data": [
    {
      "count": 3,
      "item": {
        "name": "3D Cake Topper",
        "category": "Toppers",
        "price": 25,
        "image_src": "/assets/3DCakeTopper.jpg",
        "min": 1,
        "max": 10,
        "options": {
          "theme": ["mermaid", "construction", "dinosaur", "unicorn", "custom"]
        }
      }
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

### GET /api/orders/:orderId

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

### GET /api/products/:productId

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
