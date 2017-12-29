const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Could not connect to MongoDB');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'some todo',
  //   completed: false
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('Could not insert todo data', err);
  //   }
  //   console.log(JSON.stringify(res.ops, null, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Jack',
  //   age: 26,
  //   location: 'Jersey'
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('Error creating user', err);
  //   }
  //   console.log(JSON.stringify(res.ops, null, 2));
  // })

  db.close();
});