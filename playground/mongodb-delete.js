const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Could not connect to MongoDB");
  }
  console.log("Connected to MongoDB server");

  db
    .collection("Todos")
    .deleteMany({
      text: 'eat lunch'
    })
    .then(
      res => {
        console.log('deleted:', JSON.stringify(res, null, 2));
      },
      err => {
        console.log("An error has occoured", err);
      }
    );

  // db.close();
});
