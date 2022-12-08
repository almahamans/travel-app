import { handleSubmit } from './js/formHandler'
import { remove_trip } from './js/app'
import { daysLong, countdownDays } from './js/date'
import { updateUI, trip_section, cards, day_Long,departure_date,destination_details, end_date, number_of_days, temperature, photo, weather } from './js/updateUI'
import { postData } from './js/clientServer'
import { getImage } from './js/getImage'
import { getWeatherData } from './js/getWeather'
import { getGeoDetails } from './js/getGeo'

import './styles/buttons.scss'
import './styles/layout.scss'
import './styles/form.scss'
import './styles/colors-fonts.scss'
import './styles/cards.scss'

if (localStorage["cards"]) {
    cards.innerHTML = localStorage['cards']
    trip_section.innerHTML = localStorage["tSection"]
    destination_details.innerHTML= localStorage['destDet']
    departure_date.innerHTML = localStorage['depD']
    end_date.innerHTML = localStorage['endD']
    day_Long.innerHTML = localStorage['dayslong']
    number_of_days.innerHTML= localStorage['nOofDays']
    temperature.innerHTML = localStorage['temp']
    photo.innerHTML = localStorage['photo']
    weather.innerHTML = localStorage['weather']
}

export {
remove_trip,
handleSubmit,
daysLong,
countdownDays,
updateUI,cards, trip_section, number_of_days, weather,temperature, end_date,photo, day_Long,departure_date,destination_details,
postData,
getImage,
getWeatherData,
getGeoDetails, 
}
