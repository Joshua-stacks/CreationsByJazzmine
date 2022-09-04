# Endpoints

Endpoints are grouped in the following categories:

- **administrator** - relating to admin accounts and functions

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
