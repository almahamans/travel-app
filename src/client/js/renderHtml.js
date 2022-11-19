//  render trip's details 
export function renderHTMLTemplate(
    destinationImage,
    destination,
    daysToGo,
    daysLong,
    weatherData,
    savedTripId, 
    save = true
){
    return `
    <section class='cards'>
        <section class="card__image">
            <img src="${destinationImage}">
        </section>
        <section class="card__body">
            <div class="card__text">
                ${
                    save
                        ? '<h2>' + destination + '</h2>'
                        : '<h4>' + destination + '</h4>'
                }
                <p>${daysToGo} days to go</p>
                <p>Your trip is ${daysLong} days long</p>
            </div>
            <div class="card__weather">

                <div class="card__weather--info">
                    <p class="temp">
                        ${weatherData[0].temp}<sup>&#8451;</sup>
                    </p>
                    <p>${weatherData[0].weather.description}</p>
                </div>
            </div>
        </section>
        <section class="card__footer">
            <button 
                class="btns savingbtn" 
                type="button" 
                data-trip-id="${savedTripId}" 
                onclick="return ${
                    save ? 'Client.saveTrip()' : 'Client.removeTrip()'
                }">
                    ${
                        save
                            ? '<i class="far fa-heart"></i>'
                            : '<i class="far fa-trash-alt"></i>'
                    }
                    ${save ? 'Save' : 'Remove'} Trip
            </button>
        </section>
        </section>
    `
}