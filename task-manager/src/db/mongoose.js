const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    firstName: {
        type: String        
    },
    lastName: {
        type: String
    }
})

const user = new User({
    firstName: 'Michael',
    lastName: false    
})

user.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})

const Task = mongoose.model('Task', {
    description: {type: String},
    completed: {type: Boolean}    
})

const newTask = new Task({
    description: 'Clean the house',
    completed: true
})

newTask.save().then(() => {
    console.log(newTask)
}).catch((error) => {
    console.log(error)
})