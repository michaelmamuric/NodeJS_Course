const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')

// Callback Chaining
// Use results of geocode callback as input for forecast!
const inputLocation = process.argv[2]

if(!inputLocation) {
    console.log('Please provide location')
}
else {
    geocode(inputLocation, (error, {latitude, longitude, fullPlaceName} = {}) => {
        if(error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
            console.log('Weather for ' + fullPlaceName)
            console.log(forecastData.forecast_description + '. High of ' + forecastData.high_temp + 'C. Feels like ' + forecastData.feels_like_temp + 'C.')
        })
    })
}
