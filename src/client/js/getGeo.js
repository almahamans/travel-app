const geoNamesURL = 'http://api.geonames.org/searchJSON?q='
const username = 'meem'

// Function to get Geo stats
export async function getGeoDetails(city){
    const response = await fetch(`${geoNamesURL}${city}&maxRows=10&username=${username}`);
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}