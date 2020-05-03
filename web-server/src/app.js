const path = require('path')
const express = require('express')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// Set HBS (Handlebars) as view engine
app.set('view engine', 'hbs')

// Set route to index.hbs when root is accessed
app.get('', (req, res) => {
    // First argument: name of HBS file in views folder, without extension
    // Second argument: object the HBS file can use to dynamically set page content
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Mamuric'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Mamuric'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Michael Mamuric',
        message: 'Need some help?'
    })
})

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