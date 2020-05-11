const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Create Schema first before creating User Model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error('Age is not valid')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Email is not valid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 7 || value.includes("password"))
                throw new Error('Password does not meet requirements')
        }
    }
})

// Set middleware
// pre() - run middleware before object is saved
// We need to use a regular function, not an arrow function since we need the "this" binding 
userSchema.pre('save', async function(next) {
    const user = this

    // Ensure that the password is being attempted to be replaced, so we don't do hashing if it's not needed
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})

// Pass userSchema above as second argument to model method
const User = mongoose.model('User', userSchema)

module.exports = User