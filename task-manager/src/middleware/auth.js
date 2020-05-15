const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        // Check if authorizaton header exists
        const token = req.header('Authorization').replace('Bearer ', '')
        // Decode token as defined in the authorization header
        const decodedToken = jwt.verify(token, 'MySecretSign')
        // Get user with the specified token
        const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token})
        
        if(!user)
            throw new Error()
        
        req.token = token
        req.user = user
        next()
    } catch(error) {
        res.status(401).send({error: "Please login to view this page."})
    }
}

module.exports = auth