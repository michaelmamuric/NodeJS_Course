const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// Used 127.0.0.1 instead of localhost to improve performance
const connectionURL = 'mongodb://127.0.0.1:27017' 
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology:true }, (error, client) => {
    if(error)
        return console.log('Unable to connect to database')

    // This will automatically create a database named task-manager
    const db = client.db(databaseName)

    // This will create a collection named users, and insert one document with two fields
    // named firstName and lastName
    db.collection('users').insertOne({
        firstName: 'Michael',
        lastName: 'Mamuric'
    })
})