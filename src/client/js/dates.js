//check the validity of date entered
// const std = document.querySelector('#startDate')
// const end = document.querySelector('#endDate')
const dateErr = document.querySelector('#date-error')
let today = new Date()

std.addEventListener('change', () => {
  if(std.value < changeDateFormat(today)){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = `Cann't start your trip in the past!`
    } else {
        dateErr.classList.add('hide')
    }
})

end.addEventListener('change', () => {
     if(end.value < std.value){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = 'Wrong dates enteries'
    } else if(std.value === end.value){
        dateErr.classList.remove('hide')
        dateErr.innerHTML = `Are you passing by!`
    }  else {
        dateErr.classList.add('hide')
    }
})