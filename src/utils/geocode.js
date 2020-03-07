const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lkaGFudDM0MSIsImEiOiJjazZ4ZzhweXQwOWtpM2dvMDR5c2trY3FuIn0.dhgRwHroZnswqHiMZ3Zf3Q'
    request({url, json: true}, (error, {body} = {} ) => {
        if(error) {
            callback('Could not connect to location services!',undefined)
        } else if(body.features.length === 0) {
            callback('Could not find location!', {
                latitude: 0,
                longitude: 0,
                location: 0
            })
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
