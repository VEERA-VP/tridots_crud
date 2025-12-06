# Product Management System

A full-stack application for managing products with a React frontend and Node.js backend.

## Features

- Create, read, update, and delete products
- Product categories management
- Clean and responsive UI

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose

## Getting Started

### Backend Setup

```bash
cd server
npm install
npm run dev
```

The server runs on `http://localhost:4000`

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173`

## Environment Variables

Create a `.env` file in the `server` directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=4000
```

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
