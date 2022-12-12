import { Clone } from './cloneTripSec'

export const trip_section = document.querySelector('#cards')
export const destination_details = document.getElementById("dest");
export const departure_date = document.getElementById("sd");
export const end_date = document.getElementById("ed");
export const number_of_days = document.getElementById('dg');
export const day_Long = document.getElementById('dl');
export const temperature = document.getElementById('temp');
export const photo = document.getElementById('img');
export const weather = document.getElementById('weather')
    //export let weather_icon = document.getElementById('weather_icon')
    
//Updating the UI
export function updateUI(data) {
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
    
    // let wi = `../icons/${data.weather_icon}.png`
    // weather_icon.setAttribute('src', wi )
    //weather_icon.innerHTML = data.weather_icon

    //use clone here to update UI with its info then clone empty card 
    Clone();
}