//weatherBit api
export async function getWeatherBitData(lat, lon){
    const weatherPostRequestBody = {
        baseUrl: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}`,
    }
    const weatherResponse = await fetch('/weatherbit-forcast', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(weatherPostRequestBody)
    })
    const weatherData = await weatherResponse.json();
    return weatherData;
}

//Pixabay
export async function getPixabayImages(
    photoType,
    destination
){
    const pixabayDestination = destination.split(' ').join('+');
    const pixabayRequestBody = {
        baseUrl: `https://pixabay.com/api/?q=${pixabayDestination}&image_type=${photoType}`,
    }
    const pixabayResponse = await fetch('/pixabay-images', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pixabayRequestBody),
    });
    const pixabayData = await pixabayResponse.json();
    return pixabayData;
}

//qeonames api
export async function getGeonameData(destination){
    const requestBody = {
        baseUrl: `http://api.geonames.org/searchJSON?formatted=true&q=${destination}`,
    }
    const geonameResponse = await fetch('/geonames-locations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
    })
    const geonameData = await geonameResponse.json();
    return geonameData;
}