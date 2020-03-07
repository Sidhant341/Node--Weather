//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/3a057d6051b5f220254e5a4bf2964870/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url, json:true}, (error, {body} = {}) => {
        if(error) {
            callback({error:'Unable to load weather data!'})
        } else if(body.error) {
            callback({error:'Unable to find location to load weather data!'})
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is ' + body.currently.temperature + ' degrees celsius out today. There is ' + body.currently.precipProbability + '% chance of rain today.')
        }
    })
}

module.exports = forecast