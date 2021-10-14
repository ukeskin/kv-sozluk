const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const monk = require("monk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// database initial
const mongo_url = process.env.MONGO_URI;
console.log(mongo_url);
const db = monk(mongo_url);
const Terims = db.get("terims");

//routes
app.get("/", (req, res) => {
  res.send("Hello Api 🙋‍♀️ 🙋‍♂️");
});

// fetch all data from database
app.get("/api/terims", (req, res) => {
  Terims.find().then((terims) => {
    res.json(terims);
  });
});

// fetch data from database by id
app.get("/api/terims/:id", (req, res) => {
  Terims.find({ _id: req.params.id }).then((terims) => {
    res.json(terims);
  });
});

// add data to database
app.post("/api/terims", (req, res) => {
  try {
    const data = Terims.insert({ ...req.body });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

// update data to database by id
app.patch("/api/terims/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = Terims.findOneAndUpdate({ _id: id }, { $set: req.body });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

// delete data from database by id
app.delete("/api/terims/:id", (req, res) => {
  try {
    const data = Terims.remove({ _id: req.params.id });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
