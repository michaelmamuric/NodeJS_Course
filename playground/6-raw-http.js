const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=3586e545d8a5b97bea4b12579fc7f4f2&query=40,-75'

const request = http.request(url, (response) => {
    let data = ''

    // When data is being retrieved
    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    // When response has returned entire data
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

// When a low-level error has been encountered
request.on('error', (error) => console.log(error))

request.end()