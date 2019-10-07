// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const EscapeRoom = require("../models/EscapeRooms");
const escapeRooms = require('../escapeRooms')

mongoose
  .connect('mongodb://localhost/escapejournal-back', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  EscapeRoom.deleteMany()
.then(() => {
  return EscapeRoom.create(escapeRooms) 
})
.then(escapesCreated => {
  console.log(`${escapesCreated.length} escapes created with the following id:`);
  console.log(escapesCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})