const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// var id = '592f0a8696f49c14208ecc111';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// no need to manually convert string to ObjectID when using mongoose
// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// User.findById, user not found, user found, handle error
User.findById('592dc167fa3aae8c289b3a94').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));


// email: mibach@example.com