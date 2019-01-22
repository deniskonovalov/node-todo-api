const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('UNABLE TO CONNECT DB SERVER');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5c472a33b72c7a4f0705b1dd')}).toArray().then((docs) => {
    //     console.log('All Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log(err);
    // });

    db.collection('Users').find({name: 'Denis'}).count().then((count) => {
        console.log(`Users Denis count: ${count}`);
    }, (err) => {
        console.log(err);
    });

    db.collection('Users').find({name: 'Denis'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    });
    client.close();
});
