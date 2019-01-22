const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('UNABLE TO CONNECT DB SERVER');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Test todo insert',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert data', error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Denis',
        age: 25,
        location: 'Kharkiv'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert data', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});
