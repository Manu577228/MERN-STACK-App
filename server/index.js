const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CONNECTION_STRING =
  "mongodb+srv://bnmanubharadwaj:root@cluster0.duvbjeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "MEAN-TODO-APP";
let database;

MongoClient.connect(CONNECTION_STRING, (error, client) => {
  if (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }

  database = client.db(DATABASENAME);
  console.log("Database Connection Successful");

  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});

app.get("/api/todoapp/get-notes", (req, response) => {
  database
    .collection("todoappcollection")
    .find({})
    .toArray((err, res) => {
      response.send(res);
    });
});

app.post("/api/todoapp/add-notes", (req, response) => {
  database.collection("todoappcollection").count({}, function (err, numOfDocs) {
    database.collection("todoappcollection").insertOne(
      {
        id: (numOfDocs + 1).toString(),
        description: req.body.newNotes,
      },
      (err, result) => {
        if (err) {
          console.error("Error inserting document:", err);
          response.status(500).json("Internal Server Error");
        } else {
          response.json("Note Added Successfully 😊");
        }
      }
    );
  });
});

app.delete("/api/todoapp/delete-notes", (req, response) => {
  database.collection("todoappcollection").deleteOne(
    {
      id: req.query.id,
    },
    (err, result) => {
      if (err) {
        console.error("Error deleting document:", err);
        response.status(500).json("Internal Server Error");
      } else {
        response.json("Note Deleted Successfully 🙁");
      }
    }
  );
});
