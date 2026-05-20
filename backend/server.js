const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const menu = [
  {
    id: 1,
    item: "Chicken Biryani",
    price: 250
  },
  {
    id: 2,
    item: "Paneer Butter Masala",
    price: 180
  },
  {
    id: 3,
    item: "Veg Fried Rice",
    price: 150
  },
  {
    id: 4,
    item: "Pizza",
    price: 299
  },
  {
    id: 5,
    item: "Burger",
    price: 120
  }
];

app.get("/menu", (req, res) => {

  res.json(menu);
});

app.listen(5000, () => {

  console.log("Server running on port 5000");
});
