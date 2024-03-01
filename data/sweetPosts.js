//DATA SWEETPOSTS.JS

// Data structure for dessert names and details
const sweetPosts = [
  {
    id: 1, // Unique identifier for the post
    userId: 1, // Id for the user of the post
    dessertType: "muffin", // Type of dessert
    flavor: "banana nut", // flavor
    quantity: 12, // Quantity available
    pickupOptions: "instore", // Pickup options: instore or curbside
  },
  {
    id: 2,
    userId: 1,
    dessertType: "cake",
    flavor: "chocolate and vanilla mousse cake",
    quantity: 6,
    pickupOptions: "instore",
  },
  {
    id: 3,
    userId: 1,
    dessertType: "cookie",
    flavor: "caramel pecan",
    quantity: 20,
    pickupOptions: "instore",
  },
  {
    id: 4,
    userId: 2,
    dessertType: "cupcake",
    flavor: "salted caramel",
    quantity: 10,
    pickupOptions: "curbside",
  },
  {
    id: 5,
    userId: 2,
    dessertType: "brownie",
    flavor: "chocolate fudge",
    quantity: 8,
    pickupOptions: "instore",
  },
];

// Export the sweet posts data
module.exports = sweetPosts;

//----------------------------END CODE-------------------------------------//
