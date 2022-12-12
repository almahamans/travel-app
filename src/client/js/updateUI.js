import { Clone } from './cloneTripSec'
import { day_Long, departure_date, destination_details, number_of_days, photo, weather, temperature, end_date} from './variables'
    
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