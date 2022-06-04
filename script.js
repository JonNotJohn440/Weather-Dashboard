var btnEl = $("button");
var histEl = $(".history");
var curWeatEl = $(".currentWeather");
var foreEl = $(".forecast");
var apiKey = "b1fe30e517a1376c8435d2fb62e8069c";
var pastCity = JSON.parse(localStorage.getItem("pastCities")) || [];
function clickHandler(event) {
  if ($(this).attr("id") === "submit") {
    var city = $(this).siblings().val();
    pastCity.push(city);
    localStorage.setItem("pastCities", JSON.stringify(pastCity));
    recentSearches();
    $(this).siblings().val("");
  } else {
    var city = $(this).text()
  }
  convert(city)
}

function convert(city) {
  var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      weatherGrab(lat, lon);
    });
}
function weatherGrab(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weather(data.current)
    });
}

function recentSearches() {
  histEl.empty();
  for (var i = 0; i < pastCity.length; i++) {
    var newButtonEl = $("<button>");
    newButtonEl.text(pastCity[i]);
    histEl.append(newButtonEl);
  }
}

function weather(current){
    curWeatEl.empty()
    var newUlEl=$("<ul>")

    var newLiDate = $("<Li>")
    newLiDate.text("Date: "+ current.dt)

    var newLiTemp = $("<Li>")
    newLiTemp.text("Temp: "+ current.temp)



    newUlEl.append(newLiDate, newLiTemp)
    curWeatEl.append(newUlEl)
}
recentSearches();

btnEl.on("click", clickHandler);
histEl.on("click", "button", clickHandler)