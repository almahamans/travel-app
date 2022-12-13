const express = require('express')
const app = express()

app.use(express.static('dist'))

app.listen(3005, ()=>{
    console.log('server running')
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

app.get('/',function (req,res) {
    res.status(200).sendFile('dist/index.html');
});

let projectData = {};

app.post('/postData',function (req,res){
    projectData = req.body
    res.send(projectData)
})

module.exports = app