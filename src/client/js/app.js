import  { handleSubmit, trip_section } from "./formHandler";
import { checkInput } from './checkUserInput'


const remove_trip = document.querySelector('#remove_trip')
.addEventListener('click',  () => {
    document.getElementById('form').reset();
    trip_section.classList.add('hide');
})

// document.querySelector('#cityInput').addEventListener('input', checkInput)

document.getElementById("submit")
.addEventListener('click', handleSubmit)


export {
    remove_trip
}