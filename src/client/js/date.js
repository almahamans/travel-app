// let today = new Date();

// let tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 1);

// let dayAfterTomorrow = new Date();
// dayAfterTomorrow.setDate(today.getDate() + 2);

// let maxStartDate = new Date();
// maxStartDate.setDate(today.getDate() + 15);
// maxStartDate = changeDateFormat(maxStartDate);

// const startDate = document.querySelector('#startDate');
// const endDate = document.querySelector('#endDate');

// document.addEventListener('DOMContentLoaded', function () {

//  startDate.addEventListener("change", function () {
//   if (startDate.value < changeDateFormat(today)) {
//    alert("Sorry till now we can't travel to the past!")
//    startDate.min = startDate.value = changeDateFormat(tomorrow)
//   }
//   if (startDate.value > endDate.value || startDate.value < endDate.value) {
//    endDate.min = startDate.value
//    endDate.value = startDate.value
//   }

//   if (numberOfDays(changeDateFormat(today), startDate.value) > 15) {
//    alert('Please choose a start date for the trip within 16 days max.')
//    startDate.min = startDate.value = changeDateFormat(today)
//   }


//  });

//  endDate.addEventListener("change", function () {
//   if (endDate.value < startDate.value) {
//    endDate.min = startDate.value
//    endDate.value = startDate.value
//   }
//  });

// });


// function changeDateFormat(date) {
//  let year = date.getFullYear();
//  let month = date.getMonth() + 1;
//  let day = date.getDate();
//  let formatedDate = "";
//  month = month < 10 ? month = "0" + month : month;
//  day = day < 10 ? day = "0" + day : day;
//  formatedDate += year;
//  formatedDate += "-";
//  formatedDate += month;
//  formatedDate += "-";
//  formatedDate += day;
//  return formatedDate
// }

export function countdownDays(startDate) {
   let dthen= new Date(startDate).getTime(),
    dnow = new Date().getTime();
    let x = dthen - dnow
    let days = Math.floor(x / (1000 * 60 * 60 * 24))
    return days
}

export function daysLong(startDate, endDate){
    let dthen= new Date(startDate).getTime(),
    dnow = new Date(endDate).getTime();
    let x = dthen - dnow
    let days = Math.floor(x / (1000 * 60 * 60 * 24))+1
    return days
}
