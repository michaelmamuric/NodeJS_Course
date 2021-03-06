const express = require('express')
const Task = require('../models/user')
const router = new express.Router()

// Tasks
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Get all tasks
router.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Get Task by its ObjectID
router.get('/tasks/:id', async(req, res) => {
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


// Update individual task
router.patch('/tasks/:id', async(req, res) => {
    // Error handling -> ensure only valid attributes can be changed for task
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid)
        return res.status(400).send({error: 'Invalid update!'})

    try {
        // In case a middleware in task model is defined, this will ensure that it will be called
        // before the task is saved (see user.js)
        const task = Task.findById(req.params.id)

        // Loop thru the properties of the task that are being updated
        updates.forEach((property) => {
            user[property] = req.body[property]
        })

        await task.save()

        // Original code -> altered
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!task) 
            return res.status(404).send()
        
        res.send(task)
    } catch(error) {
        res.status(400).send(error)
    }    
})

// Delete tasks by id
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task)
            return res.status(404).send()

        res.send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router