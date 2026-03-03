# MongoDB Basics – eCommerce Demo

This project is a **MongoDB basics practice set** built around a simple `eCommerce` database.  
It demonstrates **core CRUD operations, aggregation pipelines, and indexing** using small, focused shell scripts.

The files are intended to be executed in the **MongoDB shell (`mongosh`)** and can be used as a step‑by‑step learning path.

---

## Project Structure

- `01_setup.mongodb.js` – Initialize the `eCommerce` database with sample collections and documents.
- `02_reading.mongodb.js` – Practice read operations (`find`, filters, projections, sorting, pagination).
- `03_updates.mongodb.js` – Practice update operations (`updateOne`, `updateMany`, `$set`, `$inc`, `$push`).
- `04_delete.mongodb.js` – Practice delete operations (`deleteOne`, `deleteMany`).
- `05_aggregation.mongodb.js` – Practice aggregation pipelines with `$match`, `$project`, `$group`, and `$sum`.
- `06_indexes.mongodb.js` – Inspect and create indexes on the `sales` collection.

---

## Prerequisites

- **MongoDB Community Server** installed and running locally.
- **MongoDB Shell (`mongosh`)** installed and available in your PATH.
- Basic familiarity with:
  - JSON documents
  - MongoDB databases, collections, and documents
  - Command line / terminal usage

All scripts assume a local MongoDB instance and operate on a database named **`eCommerce`**.

---

## How to Run the Scripts (Step by Step)

You can run these `.mongodb.js` files directly from `mongosh` using the `load()` function.

### 1. Navigate to the project folder

In a terminal (PowerShell on Windows):

```powershell
cd "e:\MongoDB Basics"
```

### 2. Start the MongoDB shell

```powershell
mongosh
```

This will open the `mongosh` prompt connected to your local MongoDB instance.

### 3. Load each script in order

Inside `mongosh`, run the scripts one by one:

```javascript
// 1. Initialize database and seed data
load("01_setup.mongodb.js")

// 2. Run read queries
load("02_reading.mongodb.js")

// 3. Run update operations
load("03_updates.mongodb.js")

// 4. Run delete operations
load("04_delete.mongodb.js")

// 5. Run aggregation pipelines
load("05_aggregation.mongodb.js")

// 6. Inspect and create indexes
load("06_indexes.mongodb.js")
```

You can run each file multiple times as you experiment.  
For exploratory work, you may **uncomment or modify specific lines** inside the scripts and reload them.

---

## Detailed Script Overview

### `01_setup.mongodb.js` – Database & Sample Data

- Switches to the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- **Drops the existing database** (if it exists) to ensure a clean state:

  ```javascript
  db.dropDatabase()
  ```

- Inserts sample data:
  - `products` collection
    - Fields include: `name`, `price`, `category`, `stock`, `ratings`, `tags`, `createdAt`.
    - Example products: Wireless Mouse, Mechanical Keyboard, Gaming Laptop.
  - `contacts` collection
    - Simulates contact/feedback messages from users with fields like `name`, `message`, `phone`, `createdAt`.
  - `orders` collection
    - Demonstrates embedded documents and arrays:
      - `orderId`, `user`, `products` (array of `{ name, quantity, price }`), `total`, `status`, `createdAt`.

**Purpose:**  
Provide a realistic dataset to practice reading, updating, deleting, aggregating, and indexing.

---

### `02_reading.mongodb.js` – Basic & Advanced Reads

- Uses the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- Contains several **commented examples** of `find()` operations:
  - Fetch all products:

    ```javascript
    // db.products.find()
    ```

  - Filter by exact match:

    ```javascript
    // db.products.find({ name: "Wireless Mouse" })
    ```

  - Filter by category:

    ```javascript
    // db.products.find({ category: "Electronics" })
    ```

  - Filter by price range using comparison operators:

    ```javascript
    // db.products.find({ price: { $gt: 1000 } })
    // db.products.find({ price: { $gte: 1000, $lte: 50000 } })
    ```

  - Combine conditions with `$or`:

    ```javascript
    // db.products.find({
    //   $or: [{ category: "Electronics" }, { stock: { $lt: 50 } }]
    // })
    ```

  - Use projections to return only selected fields:

    ```javascript
    // db.products.find({}, { name: 1, price: 1, _id: 0 })
    ```

- The **active query** demonstrates sorting, skipping, and limiting (pagination pattern):

  ```javascript
  db.products.find().sort({ price: -1 }).skip(1).limit(3)
  ```

**Purpose:**  
Practice **filtering, projection, sorting, and pagination** on the `products` collection.

---

### `03_updates.mongodb.js` – Updates & Modifiers

- Uses the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- Provides commented examples of standard update patterns:
  - Update a single document with `$set`:

    ```javascript
    // db.products.updateOne(
    //   { name: "Wireless Mouse" },
    //   { $set: { price: 849 } }
    // )
    ```

  - Update multiple documents with `$inc` (increment stock):

    ```javascript
    // db.products.updateMany(
    //   { category: "Electronics" },
    //   { $inc: { stock: 11 } }
    // )
    ```

- The **active operation** demonstrates array update using `$push`:

  ```javascript
  db.products.updateOne(
    { name: "Wireless Mouse" },
    { $push: { tags: "new" } }
  )
  ```

**Purpose:**  
Practice **single and bulk updates**, working with **scalar fields and arrays**, and using common update operators (`$set`, `$inc`, `$push`).

---

### `04_delete.mongodb.js` – Deletions

- Uses the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- Demonstrates deletion operations:
  - Active: delete a single contact by name:

    ```javascript
    db.contacts.deleteOne({ name: "Alice" })
    ```

  - Commented: delete many orders with status `"Delivered"`:

    ```javascript
    // db.orders.deleteMany({ status: "Delivered" })
    ```

**Purpose:**  
Practice **`deleteOne` vs `deleteMany`** and understand how to safely remove documents based on filters.

---

### `05_aggregation.mongodb.js` – Aggregation Pipelines

- Uses the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- Contains a commented **`insertMany`** example for the `sales` collection with fields:
  - `_id`, `item`, `price`, `quantity`, `category`.

- Includes multiple commented aggregation examples:
  - Filter by category and project selected fields:

    ```javascript
    // db.sales.aggregate([
    //   { $match: { category: "Fruit" } },
    //   { $project: { _id: 0, item: 1, price: 1 } }
    // ])
    ```

  - Group by category and compute total sales:

    ```javascript
    // db.sales.aggregate([
    //   {
    //     $group: {
    //       _id: "$category",
    //       totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
    //     }
    //   }
    // ])
    ```

- The **active pipeline** filters `Vegetable` items and computes total sales:

  ```javascript
  db.sales.aggregate([
    { $match: { category: "Vegetable" } },
    {
      $group: {
        _id: null,
        totalFruitSales: { $sum: { $multiply: ["$price", "$quantity"] } }
      }
    }
  ])
  ```

> Note: The group field name `totalFruitSales` is just a label and can be renamed (e.g. to `totalVegetableSales`) for clarity.

**Purpose:**  
Practice **aggregation stages** like `$match`, `$project`, `$group`, and computed expressions using `$sum` and `$multiply`.

---

### `06_indexes.mongodb.js` – Indexes

- Uses the `eCommerce` database:

  ```javascript
  use("eCommerce")
  ```

- Shows how to inspect and create indexes on the `sales` collection:
  - List existing indexes:

    ```javascript
    db.sales.getIndexes()
    ```

  - (Commented) Create a simple ascending index on `quantity`:

    ```javascript
    // db.sales.createIndex({ quantity: 1 })
    ```

**Purpose:**  
Understand **how to view existing indexes** and **define a new index** to optimize query performance.

---



