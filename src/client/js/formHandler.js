const details = {}

const dest = document.querySelector('#cityInput')
const error = document.querySelector('.error')
const std = document.querySelector('#startDate')
const end = document.querySelector('#endDate')

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

 const geoNamesURL = 'http://api.geonames.org/searchJSON?q='
const username = 'meem'

// Function to get Geo stats
async function getGeoDetails(city){
    const response = await fetch(`${geoNamesURL}${city}&maxRows=10&username=${username}`
    )
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

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

const weatherforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherhistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitAPI = '43e5b5e4fc4d44418a78aaeaf0f0ac59';

//Function to get weather data
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
// rest country
// async function restCountries(dest){
// const res = await fetch(`https://restcountries.com/v3.1/all?feilds:${dest};${dest}`)
// try{
// return res.json()
// } catch(e) {
//     console.log('error', e)
// }
// }

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
// let dest_name = document.getElementById('name')
// let dest_country = document.getElementById('country')
// let dest_flag = document.getElementById('flag')
// let dest_reg = document.getElementById('reg')
// let dest_subreg = document.getElementById('subreg')
// let dest_lang = document.getElementById('lang')
// let dest_currency = document.getElementById('currency')
// let dest_currSymbol = document.getElementById('currSymbol')
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

    // dest_name.innerHTML = data.cityName
    // dest_country.innerHTML = data.capital
    // dest_flag.setAttribute('src', data.flag)
    // dest_currency.innerHTML = data.currency
    // dest_currSymbol.innerHTML = data.currency_symbol
    // dest_lang.innerHTML = data.lang
    // dest_reg.innerHTML = data.region
    // if(data.subregion){
    //    dest_subreg.innerHTML = data.subregion 
    // } else {
    //     dest_subreg.innerHTML = data.content 
    // }
    

    Clone()
}

//DOM
dest.addEventListener('change', ()=>{
     if(/\d/.test(dest.value)){
        error.classList.remove('hide') 
        error.innerHTML = `* Don't enter numbers in destination feild`
     } else {
        error.classList.add('hide')
    }
})

document.getElementById("submit")
.addEventListener('click', (e)=>{
    e.preventDefault()
    if(dest.value !== '' ){
        document.querySelector('#r_all').classList.remove('hide')
        handleSubmit(e)
        document.getElementById('form').reset()
    } else {
        error.classList.remove('hide')
        error.innerHTML = '* please fill all feilds correctly'
    }
}
)

let i = 0
let x = 0
let y = 0
function Clone() {
let main = document.querySelector('main'),
sec = document.querySelector(".allCards"),
original = document.querySelector('.data'),
clone = original.cloneNode(true); 
clone.id = `card${++i}`; 
clone.classList.remove('hide')
clone.style.marginBottom = '2%'

// let btninfo = document.createElement('button')
// btninfo.innerHTML = 'more info about this city'
// btninfo.className = 'savingbtn'

// let original2 = document.querySelector('.info')
// let clone2 = original2.cloneNode(true);
// clone2.id = `more_info${++y}`

let btnd = document.createElement('button')
btnd.innerHTML = 'Remove'
btnd.className = 'deletingbtn'
btnd.id = `delete${++x}`

// clone.appendChild(btninfo)
clone.appendChild(btnd)
// clone.appendChild(clone2)
sec.appendChild(clone)
main.appendChild(sec)

clone.scrollIntoView({behavior: "smooth"}) 

let b = document.querySelector(`#delete${x}`)
    b.addEventListener('click', (event) => {
        event.target.closest('section').remove()
     })

// let b2 = btninfo
// b2.addEventListener('click', ()=>{
//     document.querySelector(`#more_info${y}`).classList.remove('hide')
// })
// document.querySelector('#close').addEventListener('click', (event)=>{
//     document.querySelector(`#more_info${y}`).classList.add('hide')
// })     
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
//check date entered
const dateErr = document.querySelector('#date-error')
let today = new Date()

std.addEventListener('change', () => {
  if(std.value < changeDateFormat(today)){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = `Cann't start your trip in the past!`
    } else {
        dateErr.classList.add('hide')
    }
})

end.addEventListener('change', () => {
     if(end.value < std.value){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = 'Wrong dates enteries'
    } else if(std.value === end.value){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = `Sure want to stay in this city less than 1 day only!!`
    }  else {
        dateErr.classList.add('hide')
    }
})

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
