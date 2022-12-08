const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '31434193-491972de18a02049fd2bb2d83';

export async function getImage(toCity) {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}