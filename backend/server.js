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
    item: "Paneer Curry",
    price: 180
  }
];

app.get("/menu", (req, res) => {
  res.json(menu);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});