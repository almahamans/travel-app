export function countdownDays(startDate) {
   let dthen= new Date(startDate),
    dnow = new Date()

    return Math.floor((Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()) 
    - Date.UTC(dnow.getFullYear(), dnow.getMonth(), dnow.getDate()))
     / (1000 * 60 * 60 * 24))
}

export function daysLong(startDate, endDate){
    let dthen= new Date(startDate),
    dend = new Date(endDate)
    
    return Math.floor((Date.UTC(dend.getFullYear(), dend.getMonth(), dend.getDate())
    - Date.UTC(dthen.getFullYear(), dthen.getMonth(), dthen.getDate()))
     / (1000 * 60 * 60 * 24)
     ) + 1
}
