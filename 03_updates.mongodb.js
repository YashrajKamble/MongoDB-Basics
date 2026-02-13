use('eCommerce')

// db.products.updateOne(
//     { name: "Wireless Mouse" },
//     { $set: { price: 849 } }
// )

// db.products.updateMany(
//     { category: "Electronics" },
//     { $inc: { stock: 11 } }
// )

db.products.updateOne(
    { name: "Wireless Mouse" },
    { $push: { tags: "new" } }
)

