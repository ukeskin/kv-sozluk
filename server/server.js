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
const Emojis = db.get("emojis");

//routes
app.get("/", (req, res) => {
  res.send("Hello Api 🙋‍♀️ 🙋‍♂️");
});

// fetch all data from database
app.get("/api/emojis", (req, res) => {
  Emojis.find().then((emojis) => {
    res.json(emojis);
  });
});

// fetch data from database by id
app.get("/api/emojis/:id", (req, res) => {
  Emojis.find({ _id: req.params.id }).then((emojis) => {
    res.json(emojis);
  });
});

// add data to database
app.post("/api/emojis", (req, res) => {
  try {
    const data = Emojis.insert({ ...req.body });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

// update data to database by id
app.patch("/api/emojis/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = Emojis.findOneAndUpdate({ _id: id }, { $set: req.body });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

// delete data from database by id
app.delete("/api/emojis/:id", (req, res) => {
  try {
    const data = Emojis.remove({ _id: req.params.id });
    return res.json(data);
  } catch (error) {
    throw console.log(error);
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
