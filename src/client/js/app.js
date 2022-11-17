const fetch = require('node-fetch')
const baseUrl = 'http://api.geonames.org/search?'
const gApiKey = process.env.ggeo_userName

//get 
const getFunction = async(base, gkey) =>{
    try{
  const response = await fetch(`${base}&username=${gkey}`);
  const data = await response.json();
  return data;
    } catch (e){
      console.log('Error', e)
      }
}
//post
const postFunction = async (url = '', data = {}) => {
   await fetch(url, 
  {method: 'POST',
   body: JSON.stringify(data),
    credentials: "same-origin",
     headers: {'Content-Type': 'application/json'}})
    try{
      retrieveData();
    }catch(e){
      console.log('Error', e)
    }
}
//update UI
const retrieveData = async() =>{
  const request = await fetch(`http://localhost:3000/mainUI`);  
  try{
  const allData = await request.json();
  document.querySelector('.destInfo1').innerHTML = `${(allData.country).toUpperCase()}`;
  document.querySelector('.destInfo2').innerHTML = `Longitude: ${(allData.longitude)}`;
  document.querySelector('.destInfo3').innerHTML = `Latitude: ${(allData.latitude)}`;
  } catch(e){
    console.log('Error', e)
  }
 }
 //call
 btnGenerate.addEventListener('click', () =>
{  
getFunction(baseUrl, gApiKey)
  .then( (m) => {
    console.log(m)
   postFunction(`http://localhost:3000/getGeoName`,
   {country: m.country, long: m.longitude, lat: m.latitude}) })   
  }
  )
   