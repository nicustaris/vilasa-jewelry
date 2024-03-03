# Vilasa Jewelry E-Commerce System Model Documentation 🛍️

This documentation provides detailed information on the various models present in the Vilasa Jewelry e-commerce system, including their descriptions, schemas, and additional details such as timestamps and methods. 📚

![Vilasa Jewelry E-Commerce System](https://media.giphy.com/media/GbH8vRmrNHdVZhouBt/giphy.gif?cid=790b7611qspyzxnzx2vm84b7n7vtdgja28qdf8fgzzumtpch&ep=v1_gifs_search&rid=giphy.gif&ct=g)

---

## Brand Model 🏷️

### Description
Represents the brands of products in the Vilasa Jewelry e-commerce system.

### Schema
- **Title**: String (required, unique, indexed, lowercase)
- **Description**: String (required)
- **Picture**: String (required)
- **Timestamps**: Automatically generated `createdAt` and `updatedAt` fields.

---

## Category Model 📦

### Description
Represents the categories of products in the Vilasa Jewelry e-commerce system.

### Schema
- **Title**: String (required, unique, indexed, lowercase)
- **Timestamps**: Automatically generated `createdAt` and `updatedAt` fields.

---

## Coupon Model 💰

### Description
Represents coupons available in the Vilasa Jewelry e-commerce system.

### Schema
- **Name**: String (required, unique, uppercase)
- **Expiry**: Date (required)
- **Discount**: Number (required, min: 0, max: 100)
- **Timestamps**: Automatically generated `createdAt` and `updatedAt` fields.

---

## Enquiry Model 📝

### Description
Represents enquiries made by users in the Vilasa Jewelry e-commerce system.

### Schema
- **Name**: String (required)
- **Email**: String (required, validated format)
- **Mobile**: String (required, validated format)
- **Comment**: String (required)
- **Status**: String (enum: submitted, in-progress, resolved; default: submitted)
- **Timestamps**: Automatically generated `createdAt` and `updatedAt` fields.

---

## Order Model 📦

### Description
Represents an order placed by a user in the Vilasa Jewelry e-commerce system.

### Schema
- **ShippingInfo**: Object (required)
  - **firstName**: String (required)
  - **lastName**: String (required)
  - **address**: String (required)
  - **city**: String (required)
  - **state**: String (required)
  - **country**: String (default: India)
  - **pinCode**: String (required)
  - **phoneNo**: String (required)
  - **email**: String (required)
- **OrderItems**: Array (required)
  - **Name**: String (required)
  - **Price**: Number (required)
  - **Quantity**: Number (required)
  - **Image**: String (required)
  - **ProductId**: ObjectId (ref: Product, required)
- **User**: ObjectId (ref: User, required)
- **PaymentInfo**: Object
  - **Id**: String (required)
  - **Status**: String (required)
  - **PaidAt**: Date
  - **ItemsPrice**: Number (required, default: 0)
  - **TaxPrice**: Number (required, default: 0)
  - **ShippingPrice**: Number (required, default: 0)
  - **TotalPrice**: Number (required, default: 0)
  - **OrderStatus**: String (required, default: Processing)
  - **DeliveredAt**: Date
- **Timestamps**: Automatically generated `createdAt` field.

---

## Payment Model 💳

### Description
Represents payment transactions in the Vilasa Jewelry e-commerce system.

### Schema
- **ResultInfo**: Object (required)
  - **ResultStatus**: String (required)
  - **ResultCode**: String (required)
  - **ResultMsg**: String (required)
  - **TxnId**: String (required)
  - **BankTxnId**: String (required)
  - **OrderId**: String (required)
  - **TxnAmount**: String (required)
  - **TxnType**: String (required)
  - **GatewayName**: String (required)
  - **BankName**: String (required)
  - **Mid**: String (required)
  - **PaymentMode**: String (required)
  - **RefundAmt**: String (required)
  - **TxnDate**: String (required)
- **CreatedAt**: Date (default: current date/time)
- **Timestamps**: Automatically generated `createdAt` field.

---

## Product Model 💍

### Description
Represents jewelry products in the Vilasa Jewelry e-commerce system.

### Schema
- **Name**: String (required, max length: 30, min length: 4)
- **Description**: String (required)
- **Highlights**: Array of Strings (required)
- **Specifications**: Array of Objects (each object has title and description)
- **Price**: Number (required)
- **CuttedPrice**: Number (required)
- **Images**: Array of Objects (each object has public_id and url)
- **Brand**: ObjectId (ref: Brand)
- **Category**: ObjectId (ref: Category)
- **Discount**: Number (default: 0)
- **Stock**: Number (required, default: 1, max length: 4)
- **Warranty**: Number (default: 1)
- **Ratings**: Number (default: 0)
- **NumOfReviews**: Number (default: 0)
- **Reviews**: Array of Objects (each object has user, name, rating, comment, images, and createdAt)
- **User**: ObjectId (ref: User, required)
- **Timestamps**: Automatically generated `createdAt` field.

---

## User Model 👤

### Description
Represents users in the Vilasa Jewelry e-commerce system.

### Schema
- **Name**: String (required, max length: 30, min length: 4)
- **Email**: String (required, unique, lowercase, validated format)
- **Gender**: String (enum: male, female, other, required)
- **Password**: String (required, select: false)
- **Avatar**: Object (public_id and url)
- **Role**: String (enum: user, admin, default: user)
- **ResetPasswordToken**: String
- **ResetPasswordExpire**: Date
- **Methods**:
  - generateAuthToken
  - matchPassword
  - getResetPasswordToken
- **Timestamps**: Automatically generated `createdAt` and `updatedAt` fields.

---

This comprehensive documentation outlines the structure and attributes of all models within the Vilasa Jewelry e-commerce system, facilitating better understanding and utilization of the system's functionalities. 🚀
