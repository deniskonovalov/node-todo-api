const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5c4b2b2d4d521b6bae10234c').then((todo) => {
    console.log(todo);
});

Todo.findOneAndRemove({_id:'5c4b2b2d4d521b6bae10234d'}).then((todo) => {
    console.log(todo);
});
