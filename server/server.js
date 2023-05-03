const express = require('express')
const app = express()


app.listen(3001, ()=>{
    console.log('server running')
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

app.use(express.static('client'));

let projectData = {};

app.post('/postData',function (req,res){
    projectData = req.body
    res.send(projectData)
})

module.exports = app