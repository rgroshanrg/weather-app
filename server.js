const postmanRequest = require('postman-request');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecaste');
const server = require('express')();
const path = require('path');
const bodyParser = require('body-parser');

server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({ extended: true }));


server.get('', (req, res) => {
    res.render('index');
})
server.post('/', (req, res) => {
    if(!req.body.search_address)
        return res.redirect('/');
    geoCode(req.body.search_address, (error, data) => {
        if(error) {
            res.send(error);
        } else {
            foreCast(data.latitude, data.longitude, (error, data) => {
                if(error) {
                    res.send(error);
                } else {
                    res.render('weather', {
                        temperature: data.temperature, 
                        precipitation: data.precipitation,
                        weather_icons: data.weather_icons[0],
                        weather_descriptions: data.weather_descriptions[0],
                        wind_speed: data.wind_speed,
                        wind_dir: data.wind_dir,
                        pressure: data.pressure,
                        humidity: data.humidity,
                        name: data.name,
                        country: data.country,
                        region: data.region,
                        lat: data.lat,
                        lon: data.lon
                    });
                }
            });
        }
    });
});
server.get('*', (req, res) => {
    res.send("404");
})
server.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000"); #port 5000 open
});

#EOF
