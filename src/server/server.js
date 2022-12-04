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

app.get('/',function (req,res) {
    res.status(200).sendFile('dist/index.html');
});

let projectData = {};

app.post('/postData',function (req,res){
    projectData['dest'] = req.body.dest;
    projectData['startDate'] = req.body.startDate;
    projectData['endDate'] = req.body.endDate;
    projectData['temperature'] = req.body.temperature;
    projectData['weather_condition'] = req.body.weather_condition;
    projectData['daystogo'] = req.body.daystogo;
    projectData['daysLong'] = req.body.daysLong
    projectData['cityImage']  = req.body.cityImage;

    // projectData = req.body
    res.send(projectData)
})

module.exports = app