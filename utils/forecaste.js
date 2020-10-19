const requestPostman = require('postman-request');

const foreCast = (latitude, longitude, callback) => {
    const apiUrl = 'http://api.weatherstack.com/current?access_key=7431710de19e5616a3eb31f9b69b35a4&query=' + latitude + ',' + longitude;
    requestPostman({url : apiUrl, json : true}, (error, res) => {
        const current = res.body.current;
        const location = res.body.location;
        if(error) {
            callback('Internet Connection not Available', undefined);
        } else if(current.length === 0) {
            callback('Location Invalid. Please provide Valid Latitude and Longitude.', undefined);
        } else {
            callback(undefined, {
                temperature: current.temperature, 
                precipitation: current.precip,
                weather_icons: current.weather_icons,
                weather_descriptions: current.weather_descriptions,
                wind_speed: current.wind_speed,
                wind_dir: current.wind_dir,
                pressure: current.pressure,
                humidity: current.humidity,
                name: location.name,
                country: location.country,
                region: location.region,
                lat: location.lat,
                lon: location.lon
            });
        }
    })
}

module.exports = foreCast;