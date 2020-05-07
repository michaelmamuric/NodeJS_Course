// Using Restructuring to declare objects
// This is equivalent to the commented lines of code after the line below
const {MongoClient, ObjectID} = require('mongodb')
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Used 127.0.0.1 instead of localhost to improve performance
const connectionURL = 'mongodb://127.0.0.1:27017' 
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology:true }, (error, client) => {
    if(error)
        return console.log('Unable to connect to database')

    // This will automatically create a database named task-manager
    const db = client.db(databaseName)

    // Update a document
    // https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
    // First argument: filter
    // Second argument: value to be changed 
    // If no callback is provided, it will return a Promise object
    db.collection('users').updateOne({  
        _id: new ObjectID("5eb44d799f5ab940640dbce3")
    }, {
        $set: {
            firstName: 'Thomas'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // Challenge
    db.collection('tasks').updateMany({
        completed: false
    }, 
        {
            $set: {
                completed: true
            }
        }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})