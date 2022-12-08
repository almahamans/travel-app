const weatherforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherhistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitAPI = '43e5b5e4fc4d44418a78aaeaf0f0ac59';

//Function to get weather data
export async function getWeatherData(lat, lng, date) {

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