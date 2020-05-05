// Fetch API -- NOT accessible in Node.js; only accessible from browser

const weatherForm = document.querySelector('form')
const searchAddress = document.querySelector('#address')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const address = searchAddress.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast.forecast_text
            }
        })
    })
})