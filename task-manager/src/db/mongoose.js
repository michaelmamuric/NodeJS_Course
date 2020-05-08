const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        trim: true        
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email is invalid')   
        }
    },
    age: {
        type: Number,
        default: 0,
        // Custom validator
        validate(value) {
            if(value < 0)
                throw new Error('Age cannot be a negative number')
        }
    } 
})

// Valid user without age and e-mail
const user = new User({
    firstName: 'Michael',
    lastName: 'Mamuric'
})

// Invalid user with invalid age
const user2 = new User({
    firstName: 'Anne',
    lastName: 'Annerson',
    age: -1    
})

// Invalid user with invalid email
const user3 = new User({
    firstName: 'Peter',
    lastName: 'Peterson',
    email: 'peter@'
})

// Valid user with an uppercase e-mail and no age provided
const user4 = new User({
    firstName: 'John',
    lastName: 'Johnsson',
    email: 'JOHN@EMAIL.COM'
})

user.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})

user2.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})

user3.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})

user4.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})

// const Task = mongoose.model('Task', {
//     description: {type: String},
//     completed: {type: Boolean}    
// })

// const newTask = new Task({
//     description: 'Clean the house',
//     completed: true
// })

// newTask.save().then(() => {
//     console.log(newTask)
// }).catch((error) => {
//     console.log(error)
// })