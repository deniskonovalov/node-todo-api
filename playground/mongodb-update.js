const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('UNABLE TO CONNECT DB SERVER');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('5c474694b72c7a4f0705b99f')
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal:false
    //     }).then((result) => {
    //         console.log(result);
    //     });
    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5c47202d30a303500985b4c6')
        }, {
            $set: {
                name: 'Denis'
            },
            $inc: {
                age: +1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });
    client.close();
});
