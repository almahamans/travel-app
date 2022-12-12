import { handleSubmit } from './js/formHandler'
import { remove_trip } from './js/app'
import { daysLong, countdownDays, today, changeDateFormat } from './js/date'
import { updateUI,  } from './js/updateUI'
import { postData } from './js/clientServer'
import { getImage } from './js/getImage'
import { getWeatherData } from './js/getWeather'
import { getGeoDetails } from './js/getGeo'
import { Clone } from './js/cloneTripSec'
import { dateErr, std, end, dest, trip_section, error } from './js/variables'

import './styles/buttons.scss'
import './styles/layout.scss'
import './styles/form.scss'
import './styles/colors-fonts.scss'
import './styles/cards.scss'


export {
std, end, dest, error, trip_section,dateErr,
remove_trip, 
handleSubmit,
daysLong, countdownDays, today, changeDateFormat,
updateUI,
postData,
getImage,
getWeatherData,
getGeoDetails, 
Clone
}
