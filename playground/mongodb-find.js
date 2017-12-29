const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Could not connect to MongoDB");
  }
  console.log("Connected to MongoDB server");

  db
    .collection("Todos")
    .find({
      _id: new ObjectID("5a385ecc0ea6d33df42893da")
    })
    .toArray()
    .then(
      docs => {
        console.log(JSON.stringify(docs, null, 2));
      },
      err => {
        console.log("An error has occoured", err);
      }
    );

  // db.close();
});
