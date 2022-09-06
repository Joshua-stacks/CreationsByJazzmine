# Endpoints

Endpoints are grouped in the following categories:

- **administrator** - relating to admin accounts and functions
- **order** - relating to customer orders

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
