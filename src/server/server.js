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


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.get('/test', async (req, res) => {
    res.send('pass')
})

let tripInfo = {}

app.post('/addTrip', async (req, res) => {
    tripInfo = req.body
    console.log(tripInfo)
    res.json(tripInfo)
})


app.get('/getTripInfo', function (req, res) {
    res.send(tripInfo)
})


//geonames
app.get('/geonames', async (req, res) => {
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.query.city}&maxRows=1&username=${process.env.geo_key}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const newData = await response.json();
        res.json(newData)
    } catch (error) {
        console.log("geonames route error", error);
    }
})



//weatherbit
app.get('/weatherbit', async (req, res) => {

    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&days=${req.query.days + 1 }&key=${process.env.weather_key}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const newData = await response.json();
        res.json(newData.data[req.query.days])
    } catch (error) {
        console.log("weatherbit route error", error);
    }
})


// pixabay
app.get('/pixabay', async (req, res) => {
    try {
        const response = await axios.get(`https://pixabay.com/api/?q=${req.query.place}&key=${process.env.pixary_key}&image_type=photo`);

        res.send(response.data)
    } catch (error) {

        res.send('pixabay route error')
    }

})



module.exports = app