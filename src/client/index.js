import { getGeonameData, getPixabayImages, getWeatherBitData } from './js/apis'
import { renderHTMLTemplate } from './js/renderHtml'
import { daysLong, countdownDays, validateUserInput, renderSavedTrips } from './js/dom'
import { handleSubmit, saveTrip, removeTrip} from './js/formHandler'

import './styles/buttons.scss'
import './styles/cards.scss'
import './styles/colors-fonts.scss'
import './styles/form.scss'
import './styles/layout.scss'

export{
    getGeonameData,
    getPixabayImages,
    getWeatherBitData,
    removeTrip,
    renderHTMLTemplate,
    renderSavedTrips,
    daysLong,
    countdownDays,
    validateUserInput,
    saveTrip,
    handleSubmit
}