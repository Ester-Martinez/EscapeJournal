// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const User = require("../models/User");
const Users = require('../Users')

mongoose
  .connect('mongodb://localhost/escapejournal-back', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  User.deleteMany()
.then(() => {
  return User.create(Users) 
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})