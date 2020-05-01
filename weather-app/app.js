const request = require('postman-request');

const url = 'http://api.weatherstack.com/current?access_key=3586e545d8a5b97bea4b12579fc7f4f2&query=37.8267,-122.4233';

request(
    {
        url: url,
        json: true
    }, 
    (error, response) => {
        if(error != null) {
            console.log('Unable to connect to weather service');
        } 
        else {
            if(response.body.error != null)
                console.log('Unable to find location');
            else {
            console.log(response.body.current.weather_descriptions[0]);
            console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.');
            }
        }
    }
);

//Geocoding
//Address -> Latitude/Longitude -> Weather
//Print the latitude and longitude for Los Angeles

const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibW1hbXVyaWMiLCJhIjoiY2s5b29yZHNnMDJ0aDNrcGp3ODBhdnRuciJ9.JnbZrmMEBEnHr-7Tg8vbmA&limit=1';

request(
    {
        url: mapboxURL,
        json: true
    }, 
    (error, response) => {
        if(error != null)
            console.log('Unable to connect to location services');
        else {
            // Cannot find location
            if(response.body.features.length === 0)
                console.log('Unable to find location');
            else {
                const latitude = response.body.features[0].center[1];
                const longitude = response.body.features[0].center[0];
                console.log('Latitude of Los Angeles: ' + latitude);
                console.log('Longitude of Los Angeles: ' + longitude);  
            } 
        }     
    }
);
