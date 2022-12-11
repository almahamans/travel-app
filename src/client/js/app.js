import  { handleSubmit, dest, std, end } from "./formHandler";
import { trip_section } from './updateUI'


const remove_trip = document.querySelector('#remove_trip')
.addEventListener('click',  () => {
    document.getElementById('form').reset();
    trip_section.classList.add('hide')
})

const error = document.querySelector('.error')
document.getElementById("submit")
.addEventListener('click', (e)=>{
    e.preventDefault()
    let rg = /\d/.test(dest.value)
    if(!rg && dest.value || std.value || end.value !== ''){
        handleSubmit(e)
        document.getElementById('form').reset();
    } else {
        error.classList.remove('hide')
        return
    } 
})


export {
    remove_trip
}