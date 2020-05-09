const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')

// 5eb6a796e7f43d7daa194cfe -> Peter Peterson's ID
User.findByIdAndUpdate('5eb6a796e7f43d7daa194cfe', { age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})  
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})