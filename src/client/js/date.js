import { std, end, dateErr } from './variables'

// count down days to fly
export function countdownDays(startDate) {
   let dthen= new Date(startDate),
    dnow = new Date()

    return Math.floor((Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()) 
    - Date.UTC(dnow.getFullYear(), dnow.getMonth(), dnow.getDate()))
     / (1000 * 60 * 60 * 24))
}
// count how long trip is 
export function daysLong(startDate, endDate){
    let dthen= new Date(startDate),
    dend = new Date(endDate)
    
    return Math.floor((Date.UTC(dend.getFullYear(), dend.getMonth(), dend.getDate())
    - Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()))
     / (1000 * 60 * 60 * 24)
     ) + 1
}

// check entered dates while user writing
export let today = new Date()

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
        dateErr.innerHTML = `Sure want to stay in this city less than 1 day only!!`
    }else {
     dateErr.classList.add('hide')
    }
})

// to match with the input
export function changeDateFormat(date) {
     let year = date.getFullYear();
     let month = date.getMonth() + 1;
     let day = date.getDate();
     let formatedDate = "";
     month = month < 10 ? month = "0" + month : month;
     day = day < 10 ? day = "0" + day : day;
     formatedDate += year;
     formatedDate += "-";
     formatedDate += month;
     formatedDate += "-";
     formatedDate += day;
     return formatedDate
    }