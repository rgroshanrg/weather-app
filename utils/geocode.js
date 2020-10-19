const postmanRequest = require('postman-request');

const geoCode = (address, callback) => {
    const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicmdyb3NoYW5yZyIsImEiOiJja2VsZ3gwZDQwZ3dzMnptcXJvNnI2eXhoIn0.0WnakzXXvlk2IYHHq0xMLw&limit=1';
    postmanRequest({url: apiUrl, json: true}, (error, res) => {
        if(error) {
            callback('Internet Connection not Available', undefined);
        } else if(res.body.features.length === 0) {
            callback('Unable to find the Address. Try a Valid Address.', undefined);
        } else {
            callback(undefined, {latitude : res.body.features[0].center[1], longitude : res.body.features[0].center[0], location : res.body.features[0].place_name});
        }
    })
}

module.exports = geoCode;