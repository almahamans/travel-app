
export async function geonames(destination) {
  const requestBody = {
    BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=${destination}`,
};

const geonameResponse = await fetch('/geonames-locations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
});

const geonameData = await geonameResponse.json();
return geonameData;
}



export async function weatherbit(lat, lon, days) {
  let weatherForecastFormat = 'hourly';
  if (days > 7) weatherForecastFormat = 'daily';

  const weatherPostRequestBody = {
    BASE_URL: `https://api.weatherbit.io/v2.0/forecast/${weatherForecastFormat}?lat=${lat}&lon=${lon}`,
};

const weatherResponse = await fetch('/weatherbit-forecast', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(weatherPostRequestBody),
});

const weatherData = await weatherResponse.json();
return weatherData;

}

export async function pixabay(  photoType,
  category,
  isSafeSearch,
  orderBy,
  imageFormat,
  destination) {
   const pixabayDestination = destination.split(' ').join('+');

   const pixabayRequestBody = {
       BASE_URL: `https://pixabay.com/api/?q=${pixabayDestination}&image_type=${photoType}&category=${category}&safesearch=${isSafeSearch}&order=${orderBy}&orientation=${imageFormat}`,
   };

   const pixabayResponse = await fetch('/pixabay-images', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(pixabayRequestBody),
   });

   const pixabayData = await pixabayResponse.json();
   return pixabayData;
}
