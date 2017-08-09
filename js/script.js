$( document ).ready(function() {
    console.log( "ready!" );
    $(this).scrollTop(0);
    $("#get-forecast").click(getForecast);
});

function getForecast() {
  var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?';
  $.getJSON(requestURL, {
    'q': $("#location").val(),
    'APPID': '12a5b5760c644c0607d2fc6c74802e1c',
    'units': 'imperial'
  }).done(function(data){
      displayForecast(data);
    //  Use your console to check out the returning object
    //  console.log(data);
  }).fail(function(){
      var htmlString = "<h4>Your search did not work<br>Please try another</h4>";
      $("#weather").html(htmlString);
  });
}

function displayForecast(data){
    var forecast = "<h3>Showing weather for " + data.city.name + ", " + data.city.country + "</h3>";
    // This goes through each element in the data.list array to display the 5 day forecast
    data.list.forEach(function(x){
        forecast += "<h4>" + x.dt_txt + "</h4>";
        forecast += "<p>" + x.weather[0].description +"</p>";
        forecast += "<p>Temp: " + x.main.temp +"&deg;F</p>";
        forecast += "<hr>"
        console.log(x);
    });
    $("#weather").html(forecast);
}