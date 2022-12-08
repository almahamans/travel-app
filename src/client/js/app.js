import  { handleSubmit } from "./formHandler";
import { trip_section } from './updateUI'

const remove_trip = document.querySelector('#remove_trip')
.addEventListener('click',  () => {
    document.getElementById('form').reset();
    trip_section.classList.add('hide')
})


document.getElementById("submit")
.addEventListener('click', handleSubmit)


export {
    remove_trip
}