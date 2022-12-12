import  { handleSubmit, dest, std, end } from "./formHandler";
import { trip_section } from './updateUI'


const remove_trip = document.querySelector('#remove_trip')
.addEventListener('click',  () => {
    document.getElementById('form').reset();
    trip_section.classList.add('hide')
})

// on submit fire apis 
const error = document.querySelector('.error')
document.getElementById("submit")
.addEventListener('click', (e)=>{
    e.preventDefault()
    //check if there is any empty feild
    if(dest.value || std.value || end.value !== ''){
        handleSubmit(e)
        document.getElementById('form').reset();
    } else {
        error.classList.remove('hide')
        error.innerHTML = '* please fill all feilds correctly'
    } 
})
// check if destination feild has numbers
dest.addEventListener('change', ()=>{
    if(/\d/.test(dest.value)){
       error.classList.remove('hide') 
       error.innerHTML = `* Don't enter numbers in destination feild`
    } else {
        error.classList.add('hide')
    }
})


export {
    remove_trip
}