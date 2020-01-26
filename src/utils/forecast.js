const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d6c92eca54b51dbfd7c8b17c71dec184/${latitude},${longitude}?units=si&lang=en`

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const timezone = body.timezone
            const summary = body.daily.data[0].summary
            const temperature = body.currently.temperature
            const precipitation_probability = body.currently.precipProbability
            console.log(`${timezone}: ${summary} It is currently ${temperature} degrees out. There is ${precipitation_probability}% chance of rain`)

            callback(undefined, {
                timezone,
                temperature,
                summary,
                precipitation_probability
            })
        }
    })  
}

module.exports = forecast