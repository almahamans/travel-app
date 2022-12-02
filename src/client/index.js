import { renderHTMLTemplate } from './js/generateTripCard'
import { handleSubmit, saveTrip, removeTrip } from './js/formHandler'
import { geonames, pixabay, weatherbit } from './js/app'
import { daysLong, countdownDays } from './js/date'

import './styles/buttons.scss'
import './styles/layout.scss'
import './styles/form.scss'
import './styles/colors-fonts.scss'
import './styles/cards.scss'

export {
removeTrip,
renderHTMLTemplate,
saveTrip,
handleSubmit,
geonames,
pixabay,
weatherbit,
daysLong,
countdownDays
}
