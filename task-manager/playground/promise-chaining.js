const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')

// Original code

// 5eb6a796e7f43d7daa194cfe -> Peter Peterson's ID
// User.findByIdAndUpdate('5eb6a796e7f43d7daa194cfe', { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})  
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// Using async - await
const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount("5eb6a796e7f43d7daa194cfe", 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})