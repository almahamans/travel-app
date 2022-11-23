
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
