main docs - {
  "baseUrl": "http://localhost:5000/api",
  "version": "1.0.0",
  "description": "MERN Stack CRUD API for Users, Products, and Orders",
  "endpoints": {
    "users": [
      {
        "method": "POST",
        "path": "/users",
        "description": "Create a new user",
        "requestBody": {
          "name": "string (required)",
          "email": "string (required, unique)",
          "phone": "string (required)",
          "address": "string (required)"
        },
        "responseExample": {
          "_id": "6a34d093451b95eaed8770f8",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "9876543210",
          "address": "123 Main St",
          "createdAt": "2026-06-19T05:16:03.262Z",
          "updatedAt": "2026-06-19T05:16:03.262Z",
          "__v": 0
        },
        "statusCode": 201
      },
      {
        "method": "GET",
        "path": "/users",
        "description": "Get all users",
        "parameters": [],
        "responseExample": [
          {
            "_id": "6a34d093451b95eaed8770f8",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "9876543210",
            "address": "123 Main St"
          }
        ],
        "statusCode": 200
      },
      {
        "method": "GET",
        "path": "/users/:id",
        "description": "Get a user by ID",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "User's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "_id": "6a34d093451b95eaed8770f8",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "9876543210",
          "address": "123 Main St"
        },
        "statusCode": 200
      },
      {
        "method": "PUT",
        "path": "/users/:id",
        "description": "Update a user",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "User's MongoDB ObjectId"
          }
        ],
        "requestBody": {
          "name": "string (optional)",
          "email": "string (optional)",
          "phone": "string (optional)",
          "address": "string (optional)"
        },
        "responseExample": {
          "_id": "6a34d093451b95eaed8770f8",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "phone": "9876543211",
          "address": "456 New Ave"
        },
        "statusCode": 200
      },
      {
        "method": "DELETE",
        "path": "/users/:id",
        "description": "Delete a user",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "User's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "message": "User deleted successfully"
        },
        "statusCode": 200
      }
    ],
    "products": [
      {
        "method": "POST",
        "path": "/products",
        "description": "Create a new product",
        "requestBody": {
          "name": "string (required)",
          "description": "string (required)",
          "price": "number (required, min: 0)",
          "quantity": "number (required, min: 0)",
          "category": "string (required)"
        },
        "responseExample": {
          "_id": "6a34d0a4451b95eaed8770fa",
          "name": "Laptop",
          "description": "High performance laptop",
          "price": 80000,
          "quantity": 5,
          "category": "Electronics",
          "createdAt": "2026-06-19T05:16:20.816Z",
          "updatedAt": "2026-06-19T05:16:20.816Z",
          "__v": 0
        },
        "statusCode": 201
      },
      {
        "method": "GET",
        "path": "/products",
        "description": "Get all products",
        "parameters": [],
        "responseExample": [
          {
            "_id": "6a34d0a4451b95eaed8770fa",
            "name": "Laptop",
            "description": "High performance laptop",
            "price": 80000,
            "quantity": 5,
            "category": "Electronics"
          }
        ],
        "statusCode": 200
      },
      {
        "method": "GET",
        "path": "/products/:id",
        "description": "Get a product by ID",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Product's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "_id": "6a34d0a4451b95eaed8770fa",
          "name": "Laptop",
          "description": "High performance laptop",
          "price": 80000,
          "quantity": 5,
          "category": "Electronics"
        },
        "statusCode": 200
      },
      {
        "method": "PUT",
        "path": "/products/:id",
        "description": "Update a product",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Product's MongoDB ObjectId"
          }
        ],
        "requestBody": {
          "name": "string (optional)",
          "description": "string (optional)",
          "price": "number (optional)",
          "quantity": "number (optional)",
          "category": "string (optional)"
        },
        "responseExample": {
          "_id": "6a34d0a4451b95eaed8770fa",
          "name": "Gaming Laptop",
          "price": 75000,
          "quantity": 10
        },
        "statusCode": 200
      },
      {
        "method": "DELETE",
        "path": "/products/:id",
        "description": "Delete a product",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Product's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "message": "Product deleted successfully"
        },
        "statusCode": 200
      }
    ],
    "orders": [
      {
        "method": "POST",
        "path": "/orders",
        "description": "Create a new order",
        "requestBody": {
          "userId": "string (required, ObjectId ref: User)",
          "products": "array (required)",
          "products[].productId": "string (required, ObjectId ref: Product)",
          "products[].quantity": "number (required, min: 1)",
          "products[].price": "number (required)",
          "totalAmount": "number (required, min: 0)",
          "status": "string (optional, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending')"
        },
        "responseExample": {
          "_id": "6a34d0b5451b95eaed8770fc",
          "userId": {
            "_id": "6a34d093451b95eaed8770f8",
            "name": "John Doe"
          },
          "products": [
            {
              "productId": {
                "_id": "6a34d0a4451b95eaed8770fa",
                "name": "Laptop"
              },
              "quantity": 1,
              "price": 80000
            }
          ],
          "totalAmount": 81000,
          "status": "pending"
        },
        "statusCode": 201
      },
      {
        "method": "GET",
        "path": "/orders",
        "description": "Get all orders",
        "parameters": [],
        "responseExample": [
          {
            "_id": "6a34d0b5451b95eaed8770fc",
            "userId": {
              "name": "John Doe"
            },
            "products": [],
            "totalAmount": 81000,
            "status": "pending"
          }
        ],
        "statusCode": 200
      },
      {
        "method": "GET",
        "path": "/orders/:id",
        "description": "Get an order by ID",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Order's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "_id": "6a34d0b5451b95eaed8770fc",
          "userId": {
            "name": "John Doe"
          },
          "products": [],
          "totalAmount": 81000,
          "status": "pending"
        },
        "statusCode": 200
      },
      {
        "method": "PUT",
        "path": "/orders/:id",
        "description": "Update an order",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Order's MongoDB ObjectId"
          }
        ],
        "requestBody": {
          "status": "string (optional, enum: ['pending', 'confirmed', 'shipped', 'delivered'])",
          "totalAmount": "number (optional)",
          "products": "array (optional)"
        },
        "responseExample": {
          "_id": "6a34d0b5451b95eaed8770fc",
          "status": "confirmed"
        },
        "statusCode": 200
      },
      {
        "method": "DELETE",
        "path": "/orders/:id",
        "description": "Delete an order",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Order's MongoDB ObjectId"
          }
        ],
        "responseExample": {
          "message": "Order deleted successfully"
        },
        "statusCode": 200
      }
    ]
  },
  "dataModels": {
    "User": {
      "fields": {
        "_id": "ObjectId (auto-generated)",
        "name": "String (required, trimmed)",
        "email": "String (required, unique, lowercase)",
        "phone": "String (required)",
        "address": "String (required)",
        "createdAt": "Date (auto-generated)",
        "updatedAt": "Date (auto-updated)"
      }
    },
    "Product": {
      "fields": {
        "_id": "ObjectId (auto-generated)",
        "name": "String (required, trimmed)",
        "description": "String (required)",
        "price": "Number (required, min: 0)",
        "quantity": "Number (required, min: 0)",
        "category": "String (required)",
        "createdAt": "Date (auto-generated)",
        "updatedAt": "Date (auto-updated)"
      }
    },
    "Order": {
      "fields": {
        "_id": "ObjectId (auto-generated)",
        "userId": "ObjectId (ref: User, required)",
        "products": "Array of objects with productId, quantity, price",
        "totalAmount": "Number (required, min: 0)",
        "status": "String (enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending')",
        "createdAt": "Date (auto-generated)",
        "updatedAt": "Date (auto-updated)"
      }
    }
  },
  "errorCodes": {
    "200": "OK - Request successful",
    "201": "Created - Resource created successfully",
    "400": "Bad Request - Invalid request body or validation failed",
    "404": "Not Found - Resource not found",
    "500": "Internal Server Error - Server error"
  },
  "httpMethods": [
    {
      "method": "GET",
      "description": "Retrieve data"
    },
    {
      "method": "POST",
      "description": "Create new resource"
    },
    {
      "method": "PUT",
      "description": "Update existing resource"
    },
    {
      "method": "DELETE",
      "description": "Delete resource"
    }
  ],
  "notes": [
    "All timestamps are in ISO 8601 format (UTC)",
    "MongoDB ObjectIds are 24-character hexadecimal strings",
    "Email must be unique across all users",
    "Product prices and quantities must be non-negative",
    "Order quantities must be at least 1",
    "All POST and PUT requests require Content-Type: application/json header",
    "CORS is enabled for all origins",
    "Database: MongoDB",
    "Port: 5000"
  ]
}
USERS - 
{
  "baseUrl": "http://localhost:5000/api",
  "resource": "users",
  "version": "1.0.0",
  "description": "User Management API",
  "endpoints": [
    {
      "method": "POST",
      "path": "/users",
      "description": "Create a new user",
      "requestBody": {
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string"
      }
    },
    {
      "method": "GET",
      "path": "/users",
      "description": "Get all users"
    },
    {
      "method": "GET",
      "path": "/users/:id",
      "description": "Get a user by ID"
    },
    {
      "method": "PUT",
      "path": "/users/:id",
      "description": "Update a user"
    },
    {
      "method": "DELETE",
      "path": "/users/:id",
      "description": "Delete a user"
    }
  ],
  "dataModel": {
    "name": "String (required)",
    "email": "String (required, unique)",
    "phone": "String (required)",
    "address": "String (required)"
  }
}

ORDERS - 
{
  "baseUrl": "http://localhost:5000/api",
  "resource": "orders",
  "version": "1.0.0",
  "description": "Order Management API",
  "endpoints": [
    {
      "method": "POST",
      "path": "/orders",
      "description": "Create a new order",
      "requestBody": {
        "userId": "ObjectId",
        "products": "array",
        "totalAmount": "number",
        "status": "string"
      }
    },
    {
      "method": "GET",
      "path": "/orders",
      "description": "Get all orders"
    },
    {
      "method": "GET",
      "path": "/orders/:id",
      "description": "Get an order by ID"
    },
    {
      "method": "PUT",
      "path": "/orders/:id",
      "description": "Update an order"
    },
    {
      "method": "DELETE",
      "path": "/orders/:id",
      "description": "Delete an order"
    }
  ],
  "dataModel": {
    "userId": "ObjectId (ref: User)",
    "products": "Array of {productId, quantity, price}",
    "totalAmount": "Number (required, min: 0)",
    "status": "String (pending|confirmed|shipped|delivered)"
  }
}
PRODUCTS - 
{
  "baseUrl": "http://localhost:5000/api",
  "resource": "products",
  "version": "1.0.0",
  "description": "Product Management API",
  "endpoints": [
    {
      "method": "POST",
      "path": "/products",
      "description": "Create a new product",
      "requestBody": {
        "name": "string",
        "description": "string",
        "price": "number",
        "quantity": "number",
        "category": "string"
      }
    },
    {
      "method": "GET",
      "path": "/products",
      "description": "Get all products"
    },
    {
      "method": "GET",
      "path": "/products/:id",
      "description": "Get a product by ID"
    },
    {
      "method": "PUT",
      "path": "/products/:id",
      "description": "Update a product"
    },
    {
      "method": "DELETE",
      "path": "/products/:id",
      "description": "Delete a product"
    }
  ],
  "dataModel": {
    "name": "String (required)",
    "description": "String (required)",
    "price": "Number (required, min: 0)",
    "quantity": "Number (required, min: 0)",
    "category": "String (required)"
  }
}