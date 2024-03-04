# API Documentation

This document provides details about the RESTful API endpoints available in our application.

## Authentication

Endpoints for user authentication.

| Method | Endpoint          | Description                | Request Body                           | Response                              | Example                                  |
|--------|-------------------|----------------------------|----------------------------------------|---------------------------------------|------------------------------------------|
| POST   | /api/v1/user/register   | Register a new user         | `{ "name": "John", "email": "john@example.com", "password": "password" }` | `{ "success": true, "user": { "id": "1", "name": "John", "email": "john@example.com" } }` | [Link](#) |
| POST   | /api/v1/user/login   | Login user                 | `{ "email": "john@example.com", "password": "password" }`                  | `{ "success": true, "token": "JWT_TOKEN", "user": { "id": "1", "name": "John", "email": "john@example.com" } }` | [Link](#) |
| GET    | /api/v1/user/logout  | Logout user                | -                                      | `{ "success": true }`                 | [Link](#) |
| POST   | /api/v1/user/forgotpassword | Forgot password - Send reset token | `{ "email": "john@example.com" }`   | `{ "success": true, "message": "Password reset email sent" }` | [Link](#) |
| PUT    | /api/v1/user/resetpassword/:token | Reset password         | `{ "password": "new_password" }`    | `{ "success": true, "message": "Password reset successful" }` | [Link](#) |
| PUT    | /api/v1/user/updateprofile | Update user profile      | `{ "name": "New Name", "email": "newemail@example.com" }` | `{ "success": true, "user": { "id": "1", "name": "New Name", "email": "newemail@example.com" } }` | [Link](#) |

## Orders

Endpoints for managing orders.

| Method | Endpoint          | Description                | Request Body                           | Response                              | Example                                  |
|--------|-------------------|----------------------------|----------------------------------------|---------------------------------------|------------------------------------------|
| POST   | /api/v1/order/new   | Place a new order          | `{ "shippingInfo": { ... }, "orderItems": [ ... ], "paymentInfo": { ... }, "totalPrice": 100 }` | `{ "success": true, "order": { ... } }` | [Link](#) |
| GET    | /api/v1/order/:id   | Get order details by ID    | -                                      | `{ "success": true, "order": { ... } }` | [Link](#) |
| GET    | /api/v1/order/myorders | Get logged in user's orders | -                                   | `{ "success": true, "orders": [ ... ] }` | [Link](#) |
| GET    | /api/v1/order/admin/all | Get all orders (admin only) | -                                 | `{ "success": true, "orders": [ ... ] }` | [Link](#) |
| PUT    | /api/v1/order/admin/update/:id | Update order status (admin only) | `{ "status": "Shipped" }`      | `{ "success": true }`                 | [Link](#) |
| DELETE | /api/v1/order/admin/delete/:id | Delete an order (admin only) | -                              | `{ "success": true }`                 | [Link](#) |

## Products

Endpoints for managing products.

| Method | Endpoint          | Description                | Request Body                           | Response                              | Example                                  |
|--------|-------------------|----------------------------|----------------------------------------|---------------------------------------|------------------------------------------|
| POST   | /api/v1/product/    | Create a new product       | `{ "name": "Product Name", "price": 50, "category": "Category", "image": "product.jpg" }` | `{ "success": true, "product": { ... } }` | [Link](#) |
| GET    | /api/v1/product/    | Get all products           | -                                      | `{ "success": true, "products": [ ... ] }` | [Link](#) |
| GET    | /api/v1/product/admin | Get all products (Admin)  | -                                      | `{ "success": true, "products": [ ... ] }` | [Link](#) |
| PUT    | /api/v1/product/:id | Update a product           | `{ "name": "New Name" }`              | `{ "success": true, "product": { ... } }` | [Link](#) |
| DELETE | /api/v1/product/:id | Delete a product           | -                                      | `{ "success": true }`                 | [Link](#) |
## Payment

Endpoints for processing payments.

| Method | Endpoint            | Description                   | Request Body                           | Response                              | Example                                  |
|--------|---------------------|-------------------------------|----------------------------------------|---------------------------------------|------------------------------------------|
| POST   | /api/v1/payments/stripe | Process payment using Stripe | `{ "amount": 100, "email": "john@example.com", "phoneNo": "1234567890" }` | `{ "success": true, "client_secret": "CLIENT_SECRET_TOKEN" }` | [Link](#) |
| POST   | /api/v1/payments/paytm  | Process payment using Paytm  | `{ "amount": 100, "email": "john@example.com", "phoneNo": "1234567890" }` | `{ "success": true, "paytmParams": { ... } }` | [Link](#) |
| POST   | /api/v1/payments/paytm/callback | Handle Paytm callback response | -                                | Redirect to order details page       | [Link](#) |
| GET    | /api/v1/payments/status/:id | Get payment status by order ID | -                                | `{ "success": true, "txn": { ... } }` | [Link](#) |