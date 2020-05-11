const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// Use newly-registered router file - routers/user contains all user-related routes
app.use(userRouter)
// Use newly-registered router file - routers/task contains all task-related routes
app.use(userRouter)

// REST API
// POST - Create
// GET - Read
// PATCH - Update
// DELETE - Delete

app.listen(port, () => {
    console.log('Server is running')
})

const bcrypt = require('bcryptjs')

const myFunction = async() => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log('Password', password)
    console.log('Hashed', hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()