// Using Restructuring to declare objects
// This is equivalent to the commented lines of code after the line below
const {MongoClient, ObjectID} = require('mongodb')
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const id = new ObjectID()
// view timestamp when id object was created
// console.log(id.getTimestamp())

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
    // db.collection('users').insertOne({
    //     _id: id, // this will use the id object created on line 8
    //     firstName: 'Peter',
    //     lastName: 'Peterson'
    // }, (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert')
        
    //     // ops will return an array containing the newly inserted document, if there are no errors
    //     console.log(result.ops)
    // })

    // This will insert two one documents at the same time
    // Since users was already created in the commented code above, this will just reference the existing 
    // users collection
    // db.collection('users').insertMany([
    //     {
    //         firstName: 'Jen',
    //         lastName: 'Jenkins'
    //     }, {
    //         firstName: 'Anne',
    //         lastName: 'Annerson'
    //     }
    // ], (error, result) => {
    //     if(error)
    //         return console.log('Unable to insert documents')

    //     console.log(result.ops)
    // })

    // Challenge
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean room',
    //         completed: true
    //     }, {
    //         description: 'Study Node.js',
    //         completed: true            
    //     }, {
    //         description: 'Drink coffee',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error)
    //         return console.log('Unable to insert tasks')

    //     console.log(result.ops)
    // })
})