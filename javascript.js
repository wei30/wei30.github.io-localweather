$(document).ready(function(){
   var kelvin = 0;
  $.getJSON('https://ipinfo.io/json', function(Position){//get the current location by using your IP address from this website
    var lat;
    var long;
    var celsius;
    var fahrenheit;
    var changed = true;
    //Position.loc return a string of two numbers what were the latitude and longitude are
    var comma = Position.loc.indexOf(Position.loc.match(/,/)); //match the comma and return the position of where the comma located in a string
    lat =  Number(Position.loc.slice(0,comma)); //After comma found, slice() function helps to make the string break into two section 
    long = Number(Position.loc.slice(comma+1)); //Since Position.loc is a string, use Number() make the string into a number
    var AppID = "40b343785bce10daf526e46cd93d8efb";
    var openweatherurl = "https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?";
    var url = openweatherurl + "lat="+ lat + "&lon=" + long + "&appid=" + AppID; //a link that return a data with weather at your current location
    
    $('#city').html(Position.city); //return the city of where you located 
    $('#region').html(Position.region + ", " + Position.country);
   
    $.getJSON(url, function(WeatherInfo){
        //console.log(WeatherInfo);
        //$('#city').html(WeatherInfo.name);//display the city location
        kelvin = WeatherInfo.main.temp; //return the temperature in kelvin
        celsius = kelvin - 273.15; //convert celsius using kelvin
        $('#humidity').html("Humidity:" + " " + WeatherInfo.main.humidity+"%");//display the humidity
        $('#weather').html(WeatherInfo.weather[0].description);//display the description of the weather of your current location
        $('#temperature').html(celsius.toFixed(1)+"&degC");//display the temperature in temperature      
    });
  
    $('#display').click(function(){//toggle back from celsius to fahrenheit
      celsius = kelvin - 273.15;
      fahrenheit = kelvin * 9/5 - 459.67;
      
      if(changed === true){  
        $('#temperature').html(fahrenheit.toFixed()+"&degF");//dsplay temperature in fahrenheit 
        changed = false;
      }else{
        $('#temperature').html(celsius.toFixed()+"&degC");//display temperature in celsius
        changed = true; 
      } 
    });

  });
  
});