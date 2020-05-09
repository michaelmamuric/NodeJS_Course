const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Create Users
app.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Get All Users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send(error)
    }
})

// Get User by its ObjectID
app.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if(!user)
            return res.status(400).send()

        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

// Tasks
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Get all tasks
app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Get Task by its ObjectID
app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        
        if(!task)
            return res.status(404).send()

        res.send(task)     
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log('Server is running')
})