export let i =0
export function Clone() {
  let main = document.querySelector('main'),
  sec = document.querySelector(".allCards"),
  original = document.querySelector('.data'),
  clone = original.cloneNode(true); 
clone.id = "card" + ++i; 
clone.classList.remove('hide')
clone.style.marginBottom = '2%'

sec.appendChild(clone)
main.appendChild(sec)
}