const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibm11Z3phY2giLCJhIjoiY2s1ZjU1MTI1MDRrODNtbzZvdWc0Njl3eCJ9.GAGR1rRTHU1z5lEaB3psSw&limit=1'
    request({url, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;