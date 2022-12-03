import  { handleSubmit, trip_section } from "./formHandler";

const remove_trip = document.querySelector('#remove_trip')
.addEventListener('click',  () => {
    document.getElementById('form').reset();
    trip_section.classList.add('hide');
    location.reload();
});

document.getElementById("submit")
.addEventListener("click", handleSubmit);

export {
    remove_trip
}