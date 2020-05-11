const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create Users
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(error) {
        res.status(400).send(error)
    }
})

// Login
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByEmailAndPassword(req.body.email, req.body.password)
        // token below is for specific user defined above
        const token = await user.generateAuthToken() 
        res.send({user, token})
    } catch(error) {
        res.status(400).send()
    }
})

// Get All Users
// auth call is added -> ensure that only authenticated users can access page
// similar to JSP filters 
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// Get User by its ObjectID
router.get('/users/:id', async(req, res) => {
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

// Update individual user
router.patch('/users/:id', async(req, res) => {
    // Error handling -> ensure only valid attributes can be changed for user
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid)
        return res.status(400).send({error: 'Invalid update!'})

    try {
        // Ensure validator defined in user model is called
        const user = await User.findById(req.params.id)

        // Loop thru the properties of the user that are being updated
        updates.forEach((property) => {
            user[property] = req.body[property]
        })

        await user.save()

        // Original code below -> it bypasses the validator somehow?
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!user) 
            return res.status(404).send()
        
        res.send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

// Delete user by id
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user)
            return res.status(404).send()

        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router