const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3586e545d8a5b97bea4b12579fc7f4f2&query=' + latitude + ',' + longitude

    request(
        {url, json: true},
        (error, { body }) => {
            if(error)
                callback('Unable to connect to weather service', undefined)
            else {
                if(body.error)
                    callback('Unable to find location. Please try again', undefined)
                else {
                    callback(undefined, {
                        forecast_description: body.current.weather_descriptions[0],
                        high_temp: body.current.temperature,
                        feels_like_temp: body.current.feelslike,
                        forecast_text: body.current.weather_descriptions[0] + '. Current temperature is ' + body.current.temperature + 'C. Feels like ' + body.current.feelslike + 'C.'
                    })
                }    
            }
        }
    )
}

module.exports = forecast