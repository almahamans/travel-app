import { countdownDays, daysLong } from './date'
import { updateUI } from './updateUI'
import { postData } from './clientServer'
import { getImage } from './getImage'
import { getWeatherData } from './getWeather'
import { getGeoDetails } from './getGeo'

const details = {}

export function handleSubmit(e){
    e.preventDefault();

    const dest = document.querySelector('#cityInput').value
    details['dest'] = dest
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