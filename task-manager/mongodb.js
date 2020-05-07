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

    // deleteMany
    db.collection('users').deleteMany({
        firstName: 'Michael'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })

    // deleteOne
    db.collection('tasks').deleteOne({
        description: 'Clean room'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})