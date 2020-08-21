const request = require('request')
const chalk=require('chalk')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8ee6884c9b40404e5e01639e9961a139&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+ '!! It is currently ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degrees')
        }
    })
}

module.exports=forecast