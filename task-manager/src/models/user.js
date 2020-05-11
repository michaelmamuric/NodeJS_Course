const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generateAuthToken
// it is defined as a regular method instead of a static method since it needs to be accessible 
// from a particular instance of user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    // generated tokenfor user
    const token = jwt.sign({_id: user._id.toString() }, 'MySecretSign')
    // add generated token to list of tokens for user
    user.tokens = user.tokens.concat({token})
    // save, to ensure token is added
    await user.save()
    return token
}

// findByEmailAndPassword - static function that checks if user credentials are correct
userSchema.statics.findByEmailAndPassword = async (email, password) => {
    // First, find user by email
    const user = await User.findOne({ email })
    
    if(!user)
        throw new Error('Unable to login')

    // Next, check if user's encrypted password matches the plain text password he/she provided
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch)
        throw new Error('Unable to login')

    return user
}

// Set middleware to hash password
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