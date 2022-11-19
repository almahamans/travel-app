const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'))

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});

app.get('/', (_req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
  });

let projectData = {}
let savedTrips = []

// app.get(`/mainUI`, (req,res)=>{
//      console.log(projectData);
//      res.send(projectData); 
// });

app.post(`/searchTrip`, (req,res)=>{
    projectData = req.body
    console.log(projectData);
    res.send(projectData);
})
app.get('/getSearchTrip', function (req, res) {
    res.send(projectData)
})
app.get('/saveTrip', (req,res) => {
    const ntrip = { ...req.body }
    savedTrips.push(ntrip)
    res.send(ntrip)
})
app.get('/getSaveTrip', (req,res) => {
    res.json(savedTrips)
})
app.post('/removeSavedTrip', (req, res) => {
    const tripId = req.body.id;
    savedTrips = savedTrips.filter((savedTrip) => {
        return savedTrip.id != tripId;
    });
    res.json(savedTrips);
});
//api's routers
//geonames

app.get('/geonames-locations', async (req, res) => {
    try {
        const response = await axios.get(`${req.body.baseUrl}&username=${process.env.geo_key}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'}
        })
        //const newData = await response.json();
        res.send(response.data)
    } catch (error) {
        console.log("geonames api error", error);
    }
})

//weatherbit
app.get('/weatherbit-forcast', async (req, res) => {
    try {
        const response = await axios.get(`${req.body.baseUrl}&key=${process.env.weather_key}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'}
        })
        //const newData = await response.json();
        res.send(response.data)
    } catch (error) {
        console.log("weatherbit api error", error);
    }
})

// pixabay
app.get('/pixabay-images', async (req, res) => {
    try {
        const response = await axios.get(`${req.body.baseUrl}&key=${process.env.pixary_key}`);
        res.send(response.data)
    } catch (error) {
        res.send('pixabay api error')
    }
})
module.exports = app;