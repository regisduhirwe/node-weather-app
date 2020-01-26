const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiYmxvY2tjaGFpbndvbGYiLCJhIjoiY2s1a3pxd2ZhMGh6NDNlbzR0OHQ5dGI1YyJ9.zmXrh_WtJlm4rz_la_GKoA`

    request({ url: geocodeURL, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocode service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            
            callback(undefined, {
                latitude,
                longitude: longitude,
                location: body.features[0].place_name
            })
        }
    })    
}

module.exports = geocode