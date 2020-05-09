const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

// Original code

// Task.findByIdAndDelete("5eb5f66e0ccb982f98e875a2").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})    
// }).then((incompleteTasks) => {
//     console.log(incompleteTasks)
// }).catch((error) => {
//     console.log(error)
// })

// Using async - await

const deleteTaskAndCount = async(id) => {
    const taskToDelete = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false})
    return count
}

// added new document since document used in the commented example above was already deleted!
deleteTaskAndCount("5eb72fb2e7f43d7daa1969e5").then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})