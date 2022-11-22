let cityInput;

if (typeof document !== "undefined") {
    cityInput = document.querySelector('#cityInput');
  }

async function handleSubmit(event) {
    event.preventDefault()
    if (cityInput.value) {
        Client.appfunction(event)
    } else {
        alert(`please the city field cannot be empty`)
        return;
    }
}



export { handleSubmit }