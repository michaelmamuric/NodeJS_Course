const express = require('express')
const generatePDF = require('./pdf')

const app = express()

app.get('/pdf', (req, res) => {
    generatePDF(req, res)
})

app.listen(5000, () => {
    console.log('Server is running')
})