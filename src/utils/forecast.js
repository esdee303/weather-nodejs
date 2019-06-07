const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const darkSkyToken = '79fee6483e2233763060ef1b0997406a'
    const url = 'https://api.darksky.net/forecast/' + darkSkyToken + '/' 
        + encodeURIComponent(latitude) + ',' 
        + encodeURIComponent(longitude) + '?units=si'
    console.log(url)
        request({ url, json: true }, (error, { body }) => {
            if(error) {
                callback('Unable to connect to weather service', undefined)
            } else if(body.error) {
                callback('Unable to find location', undefined)
            } else {
                console.log(body.daily.data[0].temperatureLow)
                callback(undefined,{
                    time: body.currently.time,
                    timezone: body.timezone,
                    currentSummary: body.currently.summary,
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature,
                    icon: body.currently.icon,
                    precipProbability: body.currently.precipProbability,
                    precipType: body.currently.precipType,
                    humidity: body.currently.humidity,
                    pressure: body.currently.pressure,
                    windSpeed: body.currently.windSpeed,
                    uvIndex: body.currently.uvIndex,
                    ozone: body.currently.ozone,
                    dailySummary: body.daily.summary,
                    low: body.daily.data[0].temperatureLow,
                    high: body.daily.data[0].temperatureHigh,
                })  
            }
        })
}

module.exports = forecast