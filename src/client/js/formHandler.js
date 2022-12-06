import {countdownDays, daysLong} from './date'
import { checkInput } from './checkUserInput'

const details = {}

const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'meem';
const weatherforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherhistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitAPI = '43e5b5e4fc4d44418a78aaeaf0f0ac59';
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '31434193-491972de18a02049fd2bb2d83';


const plan_trip = document.querySelector('.entredData');
const trip_section = document.querySelector('#cards');

function handleSubmit(e) {
    e.preventDefault();

    details['dest'] = document.querySelector('#cityInput').value
    const std = document.querySelector('#startDate').value
    details['startDate'] = std
    const end = document.querySelector('#endDate').value
    details['endDate'] = end
    details['daystogo'] = countdownDays(std)
    details['daysLong'] = daysLong(std, end)

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
                details['weather_condition'] = weatherData['data']['0']['weather']['description'];
                // details['weather_icon'] = weatherData['data']['0']['weather']['icon'];

                //Calling Pixabay API to fetch the img of the city
                return getImage(details['dest']);
            })
            .then((imageDetails) => {
                if (imageDetails['hits'].length > 0) {
                    details['cityImage'] = imageDetails['hits'][0]['webformatURL'];
                }
                //Send data to server to store details
                return postData(details);
            })
            .then((data) => {
                updateUI(data);
            })
    } catch (e) {
        console.log('error', e);
    }
}

// Function to get Geo stats
async function getGeoDetails(city) {
    const response = await fetch(`${geoNamesURL}${city}&maxRows=10&username=${username}`);
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}


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

async function getImage(toCity) {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

async function postData(details) {
    const response = await fetch('http://localhost:3005/postData', {
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
function updateUI(data) {
    trip_section.classList.remove('hide');
    trip_section.scrollIntoView({behavior: "smooth"});

    let destination_details = document.getElementById("dest");
    let departure_date = document.getElementById("sd");
    let end_date = document.getElementById("ed");
    let number_of_days = document.getElementById('dg');
    let daysLong = document.getElementById('dl');
    let temperature = document.getElementById('temp');
    let photo = document.getElementById('img');
    let weather = document.getElementById('weather')
    // let weather_icon = document.getElementById('weather_icon')

    destination_details.innerHTML = data.dest.toUpperCase();
    departure_date.innerHTML = data.startDate;
    end_date.innerHTML = data.endDate
    daysLong.innerHTML = data.daysLong
    number_of_days.innerHTML = data.daystogo;
    temperature.innerHTML = Math.floor(data.temperature) + '&#8451;';

    if (data.cityImage !== undefined) {
        photo.setAttribute('src', data.cityImage);
    } 
    weather.innerHTML = data.weather_condition
    // let wi = `../icons/${data.weather_icon}.png`
    // weather_icon.setAttribute('src', wi )
    //weather_icon.innerHTML = data.weather_icon
}

export {
    plan_trip,
    handleSubmit,
    trip_section
}
