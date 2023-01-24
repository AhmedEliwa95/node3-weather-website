const request = require('request');

const forecast = (longitude,latitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=85227f3d504668748905729c08da2bb2&query=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&units=m`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect forecast service')
        }else if(body.error){
            callback('Unable to find this location',undefined)
        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike,
                humidity:body.current.humidity
            })
        }
    })
};

module.exports = forecast

