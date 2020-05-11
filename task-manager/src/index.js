const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// setup to use middleware to run after new request, and before the route handling is performed
// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.status(400).send('GET requests disabled')
//     } else {
//         next()
//     }
// })

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