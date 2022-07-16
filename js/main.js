//today forecast card
let currentDay = document.getElementById("currentDay"),
  currentDate = document.getElementById("currentDate"),
  cityLocation= document.getElementById("location"),
  currentDegree = document.getElementById("currentDegree"),
  todayIcon = document.getElementById("todayIcon"),
  description = document.getElementById("today-description");
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  search = document.getElementById("search");
//next day card
let nextDay = document.getElementsByClassName("nextDay"),
  nextIcon = document.getElementsByClassName("nextIcon"),
  maxdegree = document.getElementsByClassName("maxdegree"),
  mindegree = document.getElementsByClassName("mindegree"),
  custom = document.getElementsByClassName("custom"),
//arrays day && month
apiResponse,
responseData,
 days = ["sunday", "monday","tuesday", "wensday", "thursday", "friday", "Saturday",],
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ];

// get data from Api
async function getWeatherData(currentCity='cairo') {
  apiResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ffce33d005044a9194f161421220206&q=${currentCity}&days=3`
  );
  responseData= await apiResponse.json()
  console.log(responseData);
   displayTodayWheather();
  displayNextWheather()
};
getWeatherData()
//display today wheather

 function displayTodayWheather(){
  var date = new Date()
  currentDay.innerHTML = days[date.getDay()];
  currentDate.innerHTML= `${date.getDate()} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML =  responseData.location.name;
  currentDegree.innerHTML =`${ responseData.current.temp_c}${"<sup>o</sup>"}${"c"}`;
  todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML =responseData.current.wind_dir;

}
 function displayNextWheather(){
  for(let i = 0 ; i<nextDay.length;i++){

    nextDay[i].innerHTML =  days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
    nextIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxdegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
    mindegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.mintemp_c;
    custom[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text;
  }
}
 search.addEventListener("keyup",function(){
  current= document.getElementById("search").value;
console.log(current);
  getWeatherData(current);
 
})