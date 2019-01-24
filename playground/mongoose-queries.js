const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = '5c49d63d69929d6951bd6715';

// if (!ObjectID.isValid(id)) {
//     console.log('ID is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo:', todo);
// }).catch((e) => {
//     console.log(e);
// });

User.findById('5c4788f0a6944a2d6f1bc988').then((user) => {
    console.log('User:', user);
}).catch((e) => {
    console.log(e);
});
