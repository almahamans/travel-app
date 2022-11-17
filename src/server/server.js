const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('src/client'))

const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});
let projectData = {}
//routes
app.get(`/mainUI`, (req,res)=>{
     console.log(projectData);
     res.send(projectData); 
});

app.post(`/getGeoName`, (req,res)=>{
    projectData = req.body
    console.log(projectData);
    res.send(projectData);
});