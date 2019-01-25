const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {user} = require('./models/user');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findById(id).then((todo) => {

        if (!todo) {
            res.status(404).send(); 
        }

        res.status(200).send({todo});
    }).catch((e) => {
        res.status(404);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app}
