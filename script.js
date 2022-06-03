var btnEl = $("button")
var histEl = $(".history")
var curWeatEl = $(".currentWeather")
var foreEl = $(".forecast")
var apiKey = "b1fe30e517a1376c8435d2fb62e8069c"
function clickHandler(event){
    var city = $(this).siblings().val()
    convert(city)
}

function convert(city){
    var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    fetch(queryURL).then(function(response){
        return response.json()
    }).then(function(data){
        var lat = data[0].lat
        var lon = data[0].lon
        weatherGrab(lat, lon)
    })
}
function weatherGrab(lat, lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(queryURL).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    })
}
btnEl.on("click", clickHandler)