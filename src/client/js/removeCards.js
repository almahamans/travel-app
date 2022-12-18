//remove all cards
export function removeAll() {
    let all =  document.querySelector(`.allCards`)
    while (all.children.length > 1) {
        all.removeChild(all.lastChild);
    }
}
document.querySelector(`#r_all`).addEventListener('click', (event) => {
    removeAll()
    event.target.classList.add('hide')
 })