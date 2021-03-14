const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=75b1b24e9d7e96bedab15a81abd6f5e2&query=' + lat + ',' + long + '&units=f'

    request({ url , json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temp: body.current['temperature'],
                fl: body.current['feelslike'],
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = weather