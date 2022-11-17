let des2 = document.querySelector('.Des2')
let des = document.querySelector('.Des')
let depart = document.querySelector('.edate')
let eFlight = document.querySelector('.eFlight')
let eHotel = document.querySelector('.eHotel')
let eEndDep = document.querySelector('.eEndDate')
//export function dataInfo(){
let entredDes = document.querySelector('.entredDes');  
entredDes.addEventListener('input', ()=>{
    des2.innerHTML = entredDes.value
    localStorage['des2'] = des2.innerHTML
    des.innerHTML = `${entredDes.value}!`
    localStorage['des'] = des.innerHTML
})

let entredHotel = document.querySelector('.entredHotel');
entredHotel.addEventListener('input', ()=>{
    document.querySelector('.eHotel').innerHTML = entredHotel.value
    localStorage['hotel'] = eHotel.innerHTML
})

let entredFlight = document.querySelector('.entredFlight');
entredFlight.addEventListener('input', ()=>{
    document.querySelector('.eFlight').innerHTML = entredFlight.value;
    localStorage['flight'] = eFlight.innerHTML
})

let entredDate = document.querySelector('.entredDate');
let dthen, dnow, ed
entredDate.addEventListener('input', ()=>{
    ed = entredDate.value;
    document.querySelector('.edate').innerHTML = ed;
    //countdown days
    dthen= new Date(ed).getTime(),
    dnow = new Date().getTime();
    let x = dthen - dnow;
    let days = Math.floor(x / (1000 * 60 * 60 * 24));
    document.querySelector('.countdown').innerHTML = `${days} days away To`;
    
    localStorage['depart'] = depart.innerHTML
})

let entredEndDate = document.querySelector('.entredEndDate');
let eed , w
entredEndDate.addEventListener('input', ()=>{
    eed = entredEndDate.value
    document.querySelector('.eEndDate').innerHTML = eed;
    //count days long
    w = new Date(eed).getTime()
    let y = w - dthen 
    let days = Math.floor(y / (1000 * 60 * 60 * 24))+1
    document.querySelector('.tripLength').innerHTML = `trip long ${days} days`;
    localStorage['endDate'] = eEndDep.innerHTML
})
//store data in local storage
if(localStorage['des'] && localStorage['des2']){
    des2.innerHTML = localStorage['des2']
     des.innerHTML = localStorage['des']
} else if(localStorage['depart']){
    depart.innerHTML = localStorage['depart'] 
} else if(localStorage['flight']){
    eFlight.innerHTML = localStorage['flight']
} else if(localStorage['hotel']){
    eHotel.innerHTML = localStorage['hotel']
} else if(localStorage['endDate']){
    eEndDep.innerHTML = localStorage['endDate'] 
}
//export function saveTrip(){}
document.querySelector('.savingbtn').addEventListener('click',()=>{
      Clone()     
})

let i =0
function Clone() {
    let main = document.querySelector("main"),
    original = document.querySelector('.data'),
    clone = original.cloneNode(true); 
clone.id = "duplic" + ++i; 
// let btnd = document.createElement('button')
// btnd.innerHTML = 'delete trip'
// btnd.className = 'deletingbtn'
//clone.appendChild(btnd)
clone.style.marginBottom = '2%'
main.appendChild(clone);
    clear()
}

function clear(){
    des2.textContent = ''
    des.textContent = ''
    localStorage['des2'] = des2.innerHTML
    localStorage['des'] = des.innerHTML
    depart.textContent = ''
    localStorage['depart'] = depart.innerHTML
    eFlight.textContent = ''
    localStorage['flight'] = eFlight.innerHTML
    eHotel.textContent = ''
    localStorage['hotel'] = eHotel.innerHTML
    eEndDep.textContent = ''
    localStorage['endDate'] = eEndDep.innerHTML
}
//export function deleteTrip(){}
// document.querySelector('.deleteInfo').addEventListener('click',()=>{
//                     clear()
// })
// export function deleteTrip(){}
// document.querySelector('.deletingbtn').addEventListener('click',()=>{  
// })

