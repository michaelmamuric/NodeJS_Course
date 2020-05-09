const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

// Challenge
Task.findByIdAndDelete("5eb5f66e0ccb982f98e875a2").then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false})    
}).then((incompleteTasks) => {
    console.log(incompleteTasks)
}).catch((error) => {
    console.log(error)
})