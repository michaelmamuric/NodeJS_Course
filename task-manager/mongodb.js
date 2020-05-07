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

    // This will one document whose firstName value is Jen
    // If there are more than one users whose firstName value is Jen, findOne will only
    // return the first document
    db.collection('users').findOne({ firstName: 'Jen' }, (error, response) => {
        if(error)
            return console.log('Unable to fetch')
        
        console.log(response)
    })

    // Searching by ObjectId
    // _id: 5eb4460684392329eca52d40 -> This will NOT work!!!
    // _id: new ObjectID("5eb4460684392329eca52d40") -> It should be like this
    db.collection('users').findOne({ _id: new ObjectID("5eb4460684392329eca52d40") }, (error, response) => {
        if(error)
            return console.log('Unable to fetch')
        
        console.log(response)
    })

    // find allows us to search multiple documents
    // find does NOT have a callback property, rather, it returns a cursor to the collection
    // toArray is used to return an array of the documents matching the criteria
    db.collection('users').find({ firstName: 'Michael'}).toArray((error, resultList) => {
        console.log(resultList)
    })

    // count
    db.collection('users').find({ firstName: 'Michael'}).count((error, count) => {
        console.log('Number of documents returned: '+ count)
    })

    // Challenge
    // Last document in tasks collection
    db.collection('tasks').findOne({ _id: new ObjectID("5eb45151cc62982ec0a72f9e") }, (error, response) => {
        if(error)
            return console.log(error)
        
        console.log(response)
    })

    // All incomplete tasks
    db.collection('tasks').find({ completed: false }).toArray((error, resultList) => {
        if(error)
            return console.log(error)
        
        console.log(resultList)
    })
})