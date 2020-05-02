const request = require('postman-request')

const geocode = (location, callback) => {
    const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoibW1hbXVyaWMiLCJhIjoiY2s5b29yZHNnMDJ0aDNrcGp3ODBhdnRuciJ9.JnbZrmMEBEnHr-7Tg8vbmA&limit=1';
    request(
        {url: mapboxURL, json: true},
        (error, response) => {
            if(error)
                callback('Unable to connect to location services', undefined)
            else {
                if(response.body.features.length === 0)
                    callback('Unable to find location. Try again.', undefined)
                else {
                    callback(undefined, {
                        latitude: response.body.features[0].center[1],
                        longitude: response.body.features[0].center[0],
                        fullPlaceName: response.body.features[0].place_name
                    })
                }
            }
        }
    )
}

module.exports = geocode