const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Could not connect to MongoDB");
  }
  console.log("Connected to MongoDB server");

  db
    .collection("Todos")
    .findOneAndUpdate({
      _id: new ObjectID('5a385edca2a22f3e04d33fe7')
    }, {
      $set: {
        completed: true
      }
    }, {
      returnOrginal: false
    })
    .then(
      res => {
        console.log('updated:', JSON.stringify(res, null, 2));
      },
      err => {
        console.log("An error has occoured", err);
      }
    );

  // db.close();
});
