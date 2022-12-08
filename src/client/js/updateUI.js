export const trip_section = document.querySelector('#cards')
export const cards = document.querySelector('.allCards')
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
    trip_section.classList.remove('hide');
    trip_section.scrollIntoView({behavior: "smooth"});

    localStorage['tSection'] = trip_section.innerHTML
    localStorage['cards'] = cards.innerHTML

    destination_details.innerHTML = data.dest.toUpperCase()
    localStorage['destDet'] = destination_details.innerHTML

    departure_date.innerHTML = data.startDate
    localStorage['depD'] = departure_date.innerHTML

    end_date.innerHTML = data.endDate
    localStorage['endD'] = end_date.innerHTML

    day_Long.innerHTML = data.daysLong
    localStorage['dayslong'] = day_Long.innerHTML

    number_of_days.innerHTML = data.daystogo
    localStorage['nOofDays'] = number_of_days.innerHTML

    temperature.innerHTML = Math.floor(data.temperature) + '&#8451;'
    localStorage['temp'] = temperature.innerHTML

    if (data.cityImage !== undefined) {
        photo.setAttribute('src', data.cityImage)
        localStorage['photo'] = photo.innerHTML
    } 
    weather.innerHTML = data.weather_condition
    localStorage['weather'] = weather.innerHTML
    
    // let wi = `../icons/${data.weather_icon}.png`
    // weather_icon.setAttribute('src', wi )
    //weather_icon.innerHTML = data.weather_icon
}