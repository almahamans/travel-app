const savedTripsSection = document.getElementById('savedTrips');


const handleSubmit = async (event) => {
    event.preventDefault();
    const dest = document.querySelector('.entredDes');
    const departDate = document.querySelector('.entredDate');
    const endDate = document.querySelector('.entredEndDate')
    // Validate form
    const formElements = [dest, departDate];
    const isFormValid = Client.validateUserInput(formElements)

    if (!isFormValid) return;

    const tripInfo = document.querySelector('#tripInfo');

    let geoData;
    let weatherData;
    let pixData;

    try {
        geoData = await Client.getGeonameData(dest.value);

        if (geoData.geonames.length === 0) return;

        const lat = geonameData.geonames[0].lat;
        const lon = geonameData.geonames[0].lng;

        const daysToGo = Client.countdownDays(departDate.value);
        const daysLong = Client.daysLong(departDate.value, endDate.value)

        weatherData = await Client.getWeatherBitData(lat, lon);

        pixData = await Client.getPixabayImages(
            'photo',
            dest.value
        );

        // Save the search results to an object to be posted to the Express server
        const projectData = {
            id: geonameData.geonames[0].geonameId,
            departureDate: departureDate.value,
            destination: dest.value,
            leavingDate: departDate.value,
            endDate: endDate.value,
            geoData: { ...geoData.geonames[0] },
            weatherData: [...weatherData.data],
            pixData: { ...pixData.hits[0] },
        };

        postProjectdata('/searchTrip', projectData).then(
            async (searchResult) => {
                let destinationImage = 'images/trip-holder.jpg';
                if (searchResult.pixData.webformatURL) {
                    destinationImage = searchResult.pixData.webformatURL;
                }
                 const innerCard = Client.renderHTMLTemplate(
                    searchResult.pixData.webformatURL,
                    searchResult.dest,
                    daysToGo,
                    daysLong,
                    searchResult.weatherData,
                    searchResult.id
                );
                // Update the UI
                tripInfo.innerHTML = `
                    <section class="card">
                        ${innerCard}
                    </section>
                `;
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const saveTrip = async () => {
    let savedTrips = await getSavedTrips();
    const searchResult = await getSearchResult();
    if (isTripSaved(searchResult.id, savedTrips)) {
        return;
    }

    postProjectdata('/saveTrip', searchResult).then(async (savedTrip) => {
        savedTrips = await getSavedTrips();

        localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
        const daysLong = Client.daysLong(savedTrip.departureDate, savedTrip.endDate); 
        const daysToGo = Client.countdownDays(savedTrip.departureDate);
        let destinationImage = savedTrip.pixData.webformatURL

        if (!destinationImage) destinationImage = 'images/placeholder.jpg';

        const cardElement = document.createElement('section');
        cardElement.classList.add('cards');

        cardElement.innerHTML = Client.renderHTMLTemplate(
            destinationImage,
            savedTrip.destination,
            daysToGo,
            daysLong,
            savedTrip.weatherData,
            savedTrip.id,
            false
        );

        savedTripsSection.prepend(cardElement);
    });
};

const removeTrip = async (url = '/removeSavedTrip', data = {}) => {
    const parentCardElelement = event.target.closest('.cards');
     const tripId = event.target.dataset.tripId;
    data = { id: tripId };
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    const savedTrips = await response.json();

    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));

    parentCardElelement.remove();
};

const getSearchResult = async () => {
    const response = await fetch('/getSearchTrip');
    const searchResult = await response.json();
    return searchResult;
};

const getSavedTrips = async () => {
    const response = await fetch('/getSaveTrip');
    const savedTrips = await response.json();
    return savedTrips;
};

const postProjectdata = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return response.json();
};

const isTripSaved = (tripToSaveID, savedTrips) => {
    if (savedTrips.length !== 0) {
        for (let trip of savedTrips) {
            if (trip.geonameData.geonameId === tripToSaveID) {
                return true;
            }
        }
        return false;
    }
};

export { handleSubmit, saveTrip, removeTrip };