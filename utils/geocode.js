const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2NpYXJhdmlubyIsImEiOiJja2xzandvbzMxOGF2MnZvMDYxeGc0NGtzIn0._AtTEeB72H8N3YubiptQMw&limit=1'

    request({ url , json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again with different values', undefined)
        } else {
             callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode