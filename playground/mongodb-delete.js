const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('UNABLE TO CONNECT DB SERVER');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });       
    // client.close();

    // db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Denis'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteOne({_id: new ObjectID('5c471fe6e71efa4fe67f7c31')}).then((result) => {
        console.log(result);
    });       
    client.close();
});
