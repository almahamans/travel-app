let tripInfo, cityInput ;

if (typeof document !== "undefined") {
  cityInput = document.querySelector('#cityInput');
}
export async function appfunction(){
  tripInfo = { startDate: '', endDate: '', daysLong: '', countdownDays: '', city: '', geonames: '', pixabay: '', weatherbit: ''}
  geonames()
}

export async function geonames() {
  try {

    fetch(`http://localhost:3005/geonames?city=${cityInput.value}`)
      .then(res => res.json())
      .then(function (res) {
        if (res.geonames.length > 0) {
          Client.btn.disabled = true;
          tripInfo.city = cityInput.value
          tripInfo.geonames = res.geonames[0]
          tripInfo.startDate = Client.startDate.value
          tripInfo.endDate = Client.endDate.value
          tripInfo.countdownDays = Client.countdownDays(Client.startDate.value)
          tripInfo.daysLong = Client.daysLong(Client.startDate.value, Client.endDate.value)
          return 1;
        }
        else {
          cityInput.style.border = 'red'
          document.querySelector('.errorInput').style.display = 'block'
          document.querySelector('.errorInput').innerHTML = 'City not found'
          return 1;
        }
      })
      .then(weatherbit)

      } catch (error) {
        alert("Error in geonames function");
        console.log("Error in geonames function/ app file", error);
      }
}



export async function weatherbit() {

  try {

    fetch(`http://localhost:3005/weatherbit?lat=${ tripInfo.geonames.lat}&lon=${tripInfo.geonames.lng}&days=${tripInfo.countdownDays}`)
      .then(res => res.json())
      .then((res) => {
        tripInfo.weatherbit = res
      })
      .then(pixabay(tripInfo.city))
  } catch (error) {
    console.log("Error in weatherbit function/ app file", error);
  }

}

export async function pixabay(query) {
  try {
    fetch(`http://localhost:3005/pixabay?place=${query}`)
      .then(res => res.json())
      .then((res) => {
        if (res.total == 0) {
          pixabay(tripInfo.geonames.countryName)
        }
        else {
          tripInfo.pixabay = res
          //restcountries(tripInfo.geonames.countryName)
          Client.tripsList.push(tripInfo)
          printtripInfo()
        }
      })
  } catch (error) {
    console.log("Error in pixabay function/ app file", error);

  }
}

// async function restcountries(query) {
//   try {
//     fetch('' + Client.serverLink + '/restcountries?name=' + query + '')
//       .then(res => res.json())
//       .then(function (res) {
//         tripInfo.restcountries = res
//         Client.tripsList.push(tripInfo)

//         printtripInfo()
//       }
//       )

//   } catch (error) {
//     alert("Error in restcountries function");
//     console.log("Error in restcountries function", error);

//   }
// }



export async function printtripInfo() {
  try {
    if (!(tripInfo.weatherbit.max_temp)) {
      setTimeout(printtripInfo, 2000)
    }
    else {
      postData()
      Client.generateTripCard(tripInfo)
    }
  } catch (error) {
    console.log("Error in printtripInfo function / app file", error);
  }
}


// Post the trip data to server side
export async function postData() {
  const response = await fetch(`http://localhost:3005/addTrip`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(tripInfo),
  });

  try {
    const newData = await response.json();
    return newData
    } catch (error) {
    console.log("Error in posting data", error);
  }
}

// To get the trip data from the server
export async function getTripInfo() {
  const res = await fetch('http://localhost:3005/getTripInfo')
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getting data", error);
  }
}
