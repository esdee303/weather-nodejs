const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// const time = document.querySelector('#time')
// const place = document.querySelector('#place')
const current = document.querySelector('#current')
const dailySummary =  document.querySelector('#dailySummary')
const feels = document.querySelector('#feels')
const low = document.querySelector('#low')
const high = document.querySelector('#high')
const icon = document.querySelector('#icon')
// const precipPobability = document.querySelector('#precipPobability')
// const precipType = document.querySelector('#precipType')
// const humidity = document.querySelector('#humidity')
// const pressure = document.querySelector('#pressure')
// const windSpeed = document.querySelector('#windSpeed')
// const uvIndex = document.querySelector('#uvIndex')
// const ozone = document.querySelector('#ozone')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
   // const location = search.value
    // console.log(location)
    //place.textContent = 'Loading...'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                current.textContent = data.error
            } else {
                // place.textContent = data.location + ' - ' + getTimeOfZone(data.time, data.timezone),
                current.textContent =  data.temperature + '&deg;&nbsp;' + data.currentSummary + '.',
                dailySummary.textContent = data.dailySummary,
                // time.textContent = ,
                feels.innerHTML = '<span class="high-low-label">Feels Like:&nbsp;</span>' + data.apperentTemperature + '&deg;',
                low.innerHTML = '<span class="high-low-label">Low:&nbsp;</span>' + data.low + '&deg;',
                high.innerHTML = '<span class="high-low-label">High:&nbsp;</span>' + data.high + '&deg;',

                // feels.textContent = 'Feels like:&nbsp;' + data.apparentTemperature + '°  Low: ' + data.low + '°  High: ' + data.high + '°' ,
                icon.src = setIcon(data.icon, data.time, data.timezone)
                //precipPobability.textContent = data.precipPobability,
                // precipType.textContent =  data.precipType,
                //humidity.textContent =  'Humidity: ' + data.humidity + '%',
                //pressure.textContent =  'Pressure: ' + data.pressure + ' hPa',
                //windSpeed.textContent =  'Wind: ' + data.windSpeed + ' kph',
                //uvIndex.textContent = 'UV Index: ' + data.uvIndex,
                //ozone.textContent = 'Ozone: ' + data.ozone
           }
        })
    })
})



function getTimeOfZone(epochTime, timezone) {
    var d = new Date(0)
    d.setUTCSeconds(epochTime)

    var options = {
        timeZone: timezone,
        hour12: false,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    }

    formatter = new Intl.DateTimeFormat([], options)
    
    return formatter.format(d)
}



function setIcon(dataIcon, epochTime, timezone) {
    console.log(dataIcon)
    var d = new Date(0)
    d.setUTCSeconds(epochTime)
   
    var options = {
        timeZone: timezone,
        hour12: false,
        hour: 'numeric',
    }
       
    formatter = new Intl.DateTimeFormat([], options)
    
    var hour = formatter.format(d)
    console.log(hour)
    
    var iconImage = ''
   
    switch(dataIcon) {
        case 'clear-day':
        case 'clear-night':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
            iconImage = 'img/weather-icons/' + dataIcon + '.png'
            break
        case 'rain':
        case 'snow':
        case 'sleet':
        case 'wind':
        case 'fog':
        case 'cloudy':
        case 'hail':
        case 'thunderstorm':
        case 'tornado':
            if(hour > 18 || hour < 6) {
                iconImage = 'img/weather-icons/' + dataIcon + '-night.png'
            } else {
                iconImage = 'img/weather-icons/' + dataIcon + '-day.png'
            }
            break
    }

    console.log(iconImage)

    return iconImage
}