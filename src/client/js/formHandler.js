const dest = document.querySelector('#cityInput')
const error = document.querySelector('.error')
const std = document.querySelector('#startDate')
const end = document.querySelector('#endDate')

//collect all data in object then send it to the server
const details = {}

//main function
function handleSubmit(e){
    e.preventDefault();

    details['dest'] = dest.value 
    details['startDate'] = std.value 
    details['endDate'] = end.value
    details['daystogo'] = countdownDays(std.value)
    details['daysLong'] = daysLong(std.value, end.value)
    
    try {
        // Fetching geo stats of destination place.
        getGeoDetails(details['dest'])
            .then((toInfo) => {
                const lat = toInfo.geonames[0].lat;
                const lng = toInfo.geonames[0].lng;
                //Getting Weather details
                return getWeatherData(lat, lng, details['startDate']);
            })
            .then((weatherData) => {
                //Store weather details
                details['temperature'] = weatherData['data'][0]['temp'];
                details['weather_condition'] = weatherData['data'][0]['weather']['description'];
                details['weather_icon'] = weatherData['data'][0]['weather']['icon'];
                //Calling Pixabay API to fetch the img of the city
                return getImage(details['dest']);
            })
            .then((imageDetails) => {
                if (imageDetails['hits'].length > 0) {
                    details['cityImage'] = imageDetails['hits'][0]['webformatURL'];
                }
                return postData(details)
            })
            .then((data) => {
                updateUI(data)
            })
            
    } catch (e) {
        console.log('error', e);
    }
}
// Function to get Geo stats
 const geoNamesURL = 'http://api.geonames.org/searchJSON?q='
const username = 'meem'
async function getGeoDetails(city){
    const response = await fetch(`${geoNamesURL}${city}&maxRows=10&username=${username}`
    )
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}
//Function to get pic data
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '31434193-491972de18a02049fd2bb2d83';
async function getImage(toCity) {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}
//Function to get weather data
const weatherforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherhistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitAPI = '43e5b5e4fc4d44418a78aaeaf0f0ac59';
async function getWeatherData(lat, lng, date) {
    const timestamp_trip_date = Math.floor(new Date(date).getTime() / 1000);
    const todayDate = new Date();
    const timestamp_today = Math.floor(new Date(todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);
    let response;
    if (timestamp_trip_date < timestamp_today) {
        let next_date = new Date(date);
        next_date.setDate(next_date.getDate() + 1);
        response = await fetch(`${weatherhistoryURL}${lat}&lon=${lng}&start_date=${date}&end_date=${next_date}&key=${weatherbitAPI}`)
    } else {
        response = await fetch(`${weatherforecastURL}${lat}&lon=${lng}&key=${weatherbitAPI}`);
    }
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e)
    }
}
//post data to the server
async function postData(details) {
    const response = await fetch('http://localhost:3001/postData', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    });

    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

//Updating the UI
let destination_details = document.getElementById("dest");
let departure_date = document.getElementById("sd");
let end_date = document.getElementById("ed");
let number_of_days = document.getElementById('dg');
let day_Long = document.getElementById('dl');
let temperature = document.getElementById('temp');
let photo = document.getElementById('img');
let weather = document.getElementById('weather')
let weather_icon = document.getElementById('weather_icon')

function updateUI(data) {
    destination_details.innerHTML = data.dest.toUpperCase()
    departure_date.innerHTML = data.startDate
    end_date.innerHTML = data.endDate
    day_Long.innerHTML = data.daysLong
    number_of_days.innerHTML = data.daystogo
    temperature.innerHTML = Math.floor(data.temperature) + '&#8451;'
    if (data.cityImage !== undefined) {
        photo.setAttribute('src', data.cityImage)
    } 
    weather.innerHTML = data.weather_condition
    let wi = `../icons/${data.weather_icon}.png`
    weather_icon.setAttribute('src', wi)

    Clone()
}

//error message when user entered numbers in destination field
dest.addEventListener('change', ()=>{
     if(/\d/.test(dest.value)){
        error.classList.remove('hide') 
        error.innerHTML = `* Don't enter numbers in destination feild`
     } else {
        error.classList.add('hide')
    }
})
//main function... display errors or display the result
document.getElementById("submit").addEventListener('click', (e)=>{
    e.preventDefault()
    if(dest.value !== '' ){
        document.querySelector('#r_all').classList.remove('hide')
        handleSubmit(e)
        document.getElementById('form').reset()
    } else {
        error.classList.remove('hide')
        error.innerHTML = '* please fill all feilds correctly'
    }
})

//clone empty trip card to allow using multiple destinations
let i = 0, y=0, x=0
function Clone() {
let main = document.querySelector('main'),
sec = document.querySelector(".allCards"),
original = document.querySelector('.data'),
clone = original.cloneNode(true); 
clone.id = `card${++i}`; 
clone.classList.remove('hide')
clone.style.marginBottom = '2%'
//create remove button to remove one card
let btnd = document.createElement('button')
btnd.innerHTML = 'Remove'
btnd.className = 'deletingbtn'
btnd.id = `delete${++x}`
//append the button to the cloned section
clone.appendChild(btnd)
sec.appendChild(clone)
main.appendChild(sec)

let b = document.querySelector(`#delete${x}`)
    b.addEventListener('click', (event) => {
        event.target.closest('section').remove()
     })  
     
clone.scrollIntoView({behavior: "smooth"}) 
}

//remove all cards
function clearAll() {
    let all =  document.querySelector(`.allCards`)
    while (all.children.length > 1) {
        all.removeChild(all.lastChild);
    }
}
document.querySelector(`#r_all`).addEventListener('click', (event) => {
    clearAll()
    event.target.classList.add('hide')
 })
 //counting 
 function countdownDays(startDate) {
    let dthen= new Date(startDate),
     dnow = new Date()
 
     return Math.floor((Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()) 
     - Date.UTC(dnow.getFullYear(), dnow.getMonth(), dnow.getDate()))
      / (1000 * 60 * 60 * 24))
 }
 
 function daysLong(startDate, endDate){
     let dthen= new Date(startDate),
     dend = new Date(endDate)
     
     return Math.floor((Date.UTC(dend.getFullYear(), dend.getMonth(), dend.getDate())
     - Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()))
      / (1000 * 60 * 60 * 24)
      ) + 1
 }
//cahnge date formate to easy checking
function changeDateFormat(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formatedDate = "";
    month = month < 10 ? month = "0" + month : month;
    day = day < 10 ? day = "0" + day : day;
    formatedDate += year;
    formatedDate += "-";
    formatedDate += month;
    formatedDate += "-";
    formatedDate += day;
    return formatedDate
}

