// client side javascript

/*fetch('http://localhost:3000/weather?address=heusden-zolder').then((response) => {
    response.json().then((data) => {
        if(data.error) {
        console.log(data.error)
       } else {
        console.log(data.location)
        console.log(data.forecast)
        console.log(data.address)
       }
       
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.querySelector('#place')
const summary = document.querySelector('#summary')
const temperature = document.querySelector('#temperature')
const apparentTemperature = document.querySelector('#apparentTemperature')
const icon = document.querySelector('#icon')
const precipPobability = document.querySelector('#precipPobability')
const precipType = document.querySelector('#precipType')
const humidity = document.querySelector('#humidity')
const pressure = document.querySelector('#pressure')
const windSpeed = document.querySelector('#windSpeed')
const uvIndex = document.querySelector('#uvIndex')
const ozone = document.querySelector('#ozone')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    place.textContent = 'Loading...'
    temperature.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                place.textContent = data.error
            } else {
                place.textContent = data.location,
                summary.textContent =  data.summary,
                temperature.textContent = data.temperature,
                apparentTemperature.textContent = data.apparentTemperature,
                icon.textContent.textContent = data.icon,
                precipPobability.textContent = data.precipPobability,
                precipType.textContent =  data.precipType,
                humidity.textContent =  data.humidity,
                pressure.textContent =  data.pressure,
                windSpeed.textContent =  data.windSpeed,
                uvIndex.textContent = data.uvIndex,
                ozone.textContent = data.ozone
           }
           
        })
    })
})