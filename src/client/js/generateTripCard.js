//  render trip's details 
let city, section;
if (typeof document !== "undefined") {
  city = document.querySelector('#cityInput');
  section = document.querySelector('#cards');
}

let geonames = '', weatherbit = '', img = '', i = 0

export function generateTripCard(card) {

  geonames = card.geonames
  img = card.pixabay.hits[randomInt(card.pixabay.hits.length)]
  weatherbit = card.weatherbit
  //restcountries = card.restcountries[0]

  section.innerHTML = ` 
  <section id="card" class="data" data-id="1">
  <div id="card-head">
  <p id="results" class="cityName">${geonames.name}</p>
  <button class="remove btn deletingbtn">DELETE</button>
  </div>
  
  <div class="trip-data-text">
  <h3>Here are some details for your trip to:${geonames.name.toUpperCase()}, ${geonames.countryName.toUpperCase()}</h3>
  <p><strong>${card.countdownDays}</strong> days away to fly to <strong>${geonames.name}</strong> for <strong>${card.daysLong}</strong> days!</p>
  <p>Your trip starts at: <strong>${card.startDate}</strong> and ends at: <strong>${card.endDate}</strong>.</p>
  <p>Temperature for today: <strong>${weatherbit.temp}</strong>, max:<strong>${weatherbit.max_temp}</strong> and min: <strong>${weatherbit.low_temp}</strong></p>
  </div>

  <div>
  <a href="${img.pageURL}">
  <img src="${img.webformatURL}" alt="${img.tags}" class="img-pixabay">
  </a>
  </div>
  </section>` + section.innerHTML;


  city.value = ''
  Client.btn.value = 'search'
  Client.btn.disabled = false
  i++
}


export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}