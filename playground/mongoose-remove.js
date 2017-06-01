const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findOneAndRemove({_id: '5930578333afd29fa003fec3'}).then((todo) => {
  console.log(todo);
})

Todo.findByIdAndRemove('5930578333afd29fa003fec3').then((todo) => {
  console.log(todo);
})