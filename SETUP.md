# MERN Stack CRUD Dashboard

## Quick Start

### Prerequisites
- **MongoDB**: Running on `mongodb://127.0.0.1:27017`
  - Or update `MONGODB_URI` in `.env`
- **Node.js**: v18+ installed

### Installation & Running

1. **Start MongoDB** (if not already running)
   ```bash
   mongod
   ```
   Or use MongoDB Atlas by updating `MONGODB_URI` in `.env`

2. **Install dependencies** (already done, but run if needed)
   ```bash
   npm install
   ```

3. **Start the full stack**
   ```bash
   npm run dev
   ```
   - API runs on `http://localhost:5000/api`
   - Frontend runs on `http://localhost:5173`

### Individual Commands
- **Frontend only**: `npm run build` or `vite`
- **Server only**: `npm run server`
- **Linting**: `npm run lint`

## API Endpoints

Base URL: `http://localhost:5000/api`

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products
- `POST /products` - Create product
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## Frontend Features

The dashboard at `http://localhost:5173` includes:
- **Resource Switcher**: Toggle between Users, Products, and Orders
- **Live Form**: Create and edit records with real-time validation
- **Record List**: View all records with JSON preview
- **Instant Sync**: All CRUD operations update the list immediately

## Troubleshooting

### "API unavailable" message
- Ensure MongoDB is running: `mongod`
- Check `npm run server` is executing without errors
- Verify `MONGODB_URI` in `.env`

### Port already in use
- Change `PORT` in `.env` to 5001 or another available port
- Update proxy in `vite.config.js` to match

### Database connection failed
- For local MongoDB: Start with `mongod`
- For Atlas: Set `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ccc_jun17`

## Project Structure

```
server/
  ├── index.js              # Entry point, starts API server
  └── src/
      ├── app.js            # Express app & routes
      ├── db.js             # MongoDB connection
      ├── models/           # Mongoose schemas
      │   ├── User.js
      │   ├── Product.js
      │   └── Order.js
      └── routes/           # CRUD endpoints
          ├── userRoutes.js
          ├── productRoutes.js
          └── orderRoutes.js

src/
  ├── App.jsx               # Main dashboard component
  ├── App.css               # Dashboard styles
  ├── index.css             # Global styles
  ├── main.jsx              # React entry
  └── assets/
```
