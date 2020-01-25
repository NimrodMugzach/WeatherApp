const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/120bb3d2a8a396a94d777641c3fe37d8/'+ encodeURIComponent(longitude) +','+ encodeURIComponent(latitude) + '?units=si';
    request({ url, json: true}, (err, { body }) => {
        if(err) {
             callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' +
                    body.currently.temperature + ' degrees and there is ' + body.currently.precipProbability +'% chance of rain and the wind Speed is '
                    + body.currently.windSpeed + ' miles per hour!'

            );
        }
    });
};

module.exports = forecast;