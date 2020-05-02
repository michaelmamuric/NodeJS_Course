const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3586e545d8a5b97bea4b12579fc7f4f2&query=' + latitude + ',' + longitude

    request(
        {url: url, json: true},
        (error, response) => {
            if(error)
                callback('Unable to connect to weather service', undefined)
            else {
                if(response.body.error)
                    callback('Unable to find location. Please try again', undefined)
                else {
                    callback(undefined, {
                        forecast_description: response.body.current.weather_descriptions[0],
                        high_temp: response.body.current.temperature,
                        feels_like_temp: response.body.current.feelslike
                    })
                }    
            }
        }
    )
}

module.exports = forecast