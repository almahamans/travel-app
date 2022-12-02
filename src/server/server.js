var path = require('path')
const axios = require('axios')
const fetch = require('fetch-node');

const express = require('express')
const app = express()

app.use(express.static('dist'))

app.listen(3005, ()=>{
    console.log('server running')
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());


homePage = (req, res) => {
    res.sendFile('./dist/index.html');
};

geoNameLocations = async (req, res) => {
    const response = await axios.get(
        `${req.body.BASE_URL}&username=${process.env.geo_key}`
    );
    res.send(response.data);
};

weatherBitForecast = async (req, res) => {
    const response = await axios.get(
        `${req.body.BASE_URL}&key=${process.env.weather_key}`
    );
    res.send(response.data);
};

pixabayImages = async (req, res) => {
    const response = await axios.get(
        `${req.body.BASE_URL}&key=${process.env.pixary_key}`
    );
    res.send(response.data);
};

app.get('/', homePage);
app.post('/geonames-locations', geoNameLocations);
app.post('/weatherbit-forecast', weatherBitForecast);
app.post('/pixabay-images', pixabayImages);

app.post('/save-search-result', (req, res) => {
    projectData = req.body;
    res.send(projectData);
});

app.get('/get-search-result', (req, res) => {
    res.json(projectData);
});

app.post('/save-trip', (req, res) => {
    const trip = { ...req.body };
    savedTrips.push(trip);
    res.send(trip);
});

app.get('/get-saved-trips', (req, res) => {
    res.json(savedTrips);
});

app.post('/remove-saved-trip', (req, res) => {
    const tripId = req.body.id;

    savedTrips = savedTrips.filter((savedTrip) => {
        return savedTrip.id != tripId;
    });

    res.json(savedTrips);
});



module.exports = app