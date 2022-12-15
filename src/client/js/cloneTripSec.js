import { i, x } from './variables'

// clone trip card to create multiple 
export function Clone() {
  let main = document.querySelector('main'),
  sec = document.querySelector(".allCards"),
  original = document.querySelector('.data'),
  clone = original.cloneNode(true); 
clone.id = "card" + ++i; 
clone.classList.remove('hide')
clone.style.marginBottom = '2%'

let btnd = document.createElement('button')
btnd.innerHTML = 'Remove'
btnd.className = 'deletingbtn'
btnd.id = `delete${++x}`

clone.appendChild(btnd)
sec.appendChild(clone)
main.appendChild(sec)

clone.scrollIntoView({behavior: "smooth"})

document.querySelector(`#delete${x}`).addEventListener('click', () => {
  document.querySelector(`#card${i}`).classList.add('hide')
})
}