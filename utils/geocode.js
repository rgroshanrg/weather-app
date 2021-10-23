const postmanRequest = require('postman-request');

const geoCode = (address, callback) => {
    const accessToken = "pk.eyJ1Ijoicmdyb3NoYW5yZyIsImEiOiJja2VsZ3gwZDQwZ3dzMnptcXJvNnI2eXhoIn0.0WnakzXXvlk2IYHHq0xMLw"
    const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + accessToken +   '&limit=1';
    postmanRequest({url: apiUrl, json: true}, (error, res) => {
        if(error) {
            callback('Please conect to the Internet', undefined);
        } else if(res.body.features.length === 0) {
            callback('Please try a Valid Address.', undefined);
        } else {
            callback(undefined, {latitude : res.body.features[0].center[1], longitude : res.body.features[0].center[0], location : res.body.features[0].place_name});
        }
    })
}

module.exports = geoCode;

#EOF
