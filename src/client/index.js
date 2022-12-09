import { handleSubmit } from './js/formHandler'
import { remove_trip } from './js/app'
import { daysLong, countdownDays } from './js/date'
import { updateUI } from './js/updateUI'
import { postData } from './js/clientServer'
import { getImage } from './js/getImage'
import { getWeatherData } from './js/getWeather'
import { getGeoDetails } from './js/getGeo'

import './styles/buttons.scss'
import './styles/layout.scss'
import './styles/form.scss'
import './styles/colors-fonts.scss'
import './styles/cards.scss'


export {
remove_trip,
handleSubmit,
daysLong,
countdownDays,
updateUI,
postData,
getImage,
getWeatherData,
getGeoDetails, 
}
