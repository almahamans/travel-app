import { generateTripCard } from './js/generateTripCard'
import { handleSubmit } from './js/formHandler'
import { appfunction, getTripInfo } from './js/app'
import { daysLong, countdownDays } from './js/date'

import './styles/buttons.scss'
import './styles/layout.scss'
import './styles/form.scss'
import './styles/colors-fonts.scss'
import './styles/cards.scss'

let tripsList = []

document.addEventListener('DOMContentLoaded', () => {
 tripsList = []
})

const btn = document.querySelector('#submit');
btn.addEventListener('click', function (event) {
 handleSubmit(event)
});

const btnR = document.querySelector('.remove')
btnR.document.addEventListener("click",
function removeListener(event) {
 if (event.target.classList.contains("remove")) {
  event.target.parentNode.parentNode.remove();
  localStorage.setItem("sectioninnerHTML", document.getElementById("cards").innerHTML);
 }
})

export {
 //serverLink,
 generateTripCard, getTripInfo,
 handleSubmit,
countdownDays,
daysLong,
 tripsList,
  btn, 
  btnR,
 appfunction
}