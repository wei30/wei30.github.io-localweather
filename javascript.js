$(document).ready(function(){
  $.getJSON('https://ipinfo.io/json', function(Position){//get the current location by using your IP address from this website
    var lat;
    var long;
    var celsius;
    var fahrenheit;
    var changed = true;
    var kelvin = 0;
    var icon;
    
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
      console.log(url);
        //$('#city').html(WeatherInfo.name);//display the city location
        kelvin = WeatherInfo.main.temp; //return the temperature in kelvin
        celsius = kelvin - 273.15; //convert celsius using kelvin
        $('#humidity').html("Humidity:" + " " + WeatherInfo.main.humidity+"%");//display the humidity
        $('#weather').html(WeatherInfo.weather[0].description);//display the description of the weather of your current location
        $('#temperature').html(celsius.toFixed(1)+"&degC");//display the temperature in temperature    
     
      //get the correct image with the current weather
      icon = WeatherInfo.weather[0].icon;

        if(icon[2] === "n"){
          $("body").css("background-color", "#4B0082");
        }


      switch(icon){
          case "01d": 
                $("#image").html('<img src="http://openweathermap.org/img/w/01d.png" height=50px width=50px/>');
                break;
          case "01n":
                 $("#image").html('<img src="http://openweathermap.org/img/w/01n.png" height=50px width=50px/>');
                break;
          case "02d":
                  $("#image").html('<img src="http://openweathermap.org/img/w/02d.png" height=50px width=50px/>');
                break;
          case "02n":
                   $("#image").html('<img src="http://openweathermap.org/img/w/02n.png" height=30px width=30px/>');
                break;
          case "03d":
          case "03n":
                   $("#image").html('<img src="http://openweathermap.org/img/w/03d.png" height=50px width=50px/>');
                break;
          case "04d":
          case "04n":
                   $("#image").html('<img src="http://openweathermap.org/img/w/04d.png" height=30px width=30px/>');
                break;
          case "09d":
          case "09n":
                    $("#image").html('<img src="http://openweathermap.org/img/w/09d.png" height=30px width=30px/>');
                break;
          case "10d":
          case "10n":
                    $("#image").html('<img src="http://openweathermap.org/img/w/10d.png" height=30px width=30px/>');
                break;
          case "11d":
          case "11n":
                    $("#image").html('<img src="http://openweathermap.org/img/w/11d.png" height=30px width=30px/>');
                break;
          case "13d":
          case "13n":
                    $("#image").html('<img src="http://openweathermap.org/img/w/13d.png" height=30px width=30px/>');
                break;
          case "50d":
          case "50n":
                    $("#image").html('<img src="http://openweathermap.org/img/w/50d.png" height=30px width=30px/>');
                break;
          
          
       }
     if(WeatherInfo.weather[0].icon === "01d"){
        $("#image").html('<img src="http://openweathermap.org/img/w/01d.png" height=30px width=30px/>');
      }
    });
        
     
  
    $('#display').click(function(){//toggle back from celsius to fahrenheit
      celsius = kelvin - 273.15;
      fahrenheit = kelvin * 9/5 - 459.67;
      
      if(changed === true){  
        $('#temperature').html(fahrenheit.toFixed(1)+"&degF");//dsplay temperature in fahrenheit 
        changed = false;
      }else{
        $('#temperature').html(celsius.toFixed(1)+"&degC");//display temperature in celsius
        changed = true; 
      } 
      
      
      
    });
  });
  
});
