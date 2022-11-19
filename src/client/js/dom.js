    //countdown days
export function countdownDays(date){
    dthen= new Date(date).getTime(),
    dnow = new Date().getTime();
    let x = dthen - dnow;
    let days = Math.floor(x / (1000 * 60 * 60 * 24));
    //document.querySelector('.countdown').innerHTML = `${days} days away To`;
    return days
}
    //count days long
export function daysLong(deprtDate, endDate){
    let end = new Date(endDate).getTime()
    let start = new Date(deprtDate).getTime()
    let x = end - start 
    let days = Math.floor(x / (1000 * 60 * 60 * 24))+1
    //document.querySelector('.tripLength').innerHTML = `trip long ${days} days`;
    return days
}
// check local storage for saved trips using local storage
export function renderSavedTrips(){

    const savedTripsLocalStorage = JSON.parse(
        localStorage.getItem('savedTrips')
    )

    if (savedTripsLocalStorage != null) {
        let documentFragment = new DocumentFragment();
        for (let localStorageSavedTrip of savedTripsLocalStorage) {
            const cardElement = document.createElement('section');
            cardElement.classList.add('cards', 'card--column');

            const daysToGo = Client.countdownDays(
                savedTripsLocalStorage.departureDate
            )
            const daysLong = Client.daysLong(
                savedTripsLocalStorage.departureDate,
                savedTripsLocalStorage.endDate
            )
            cardElement.innerHTML = Client.renderHTMLTemplate(
                localStorageSavedTrip.pixabayData.webformatURL,
                localStorageSavedTrip.destination,
                daysToGo,
                daysLong,
                localStorageSavedTrip.weatherData,
                localStorageSavedTrip.id,
                false
            )
            documentFragment.appendChild(cardElement);
        }
        savedTripsSection.appendChild(documentFragment);
    }
}
//validate form 
export function validateUserInput(formElements){
    for (let formElement of formElements) {
        if (!formElement.value) {
            formElement.classList.add('error');
            return false;
        } else {
            formElement.classList.remove('error');
            return true;
        }
    }
}
