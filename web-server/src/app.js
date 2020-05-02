const path = require('path')
const express = require('express')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// weather
app.get('/weather', (req, res) => {
    res.send({
        location: 'Calgary',
        forecast: 'Sunny'
    })
})

app.listen(3000, () => {
    console.log('Server is running')    
})