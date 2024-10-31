function buttonClicked() {    
    var city = document.getElementById("city_input").value;
    var country = document.getElementById("country_input").value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city},${country}&days=1`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("location").innerHTML = `Location: ${data.location.name}, ${data.location.region}, ${data.location.country}`;
        document.getElementById("local_time").innerHTML = `Local Time: ${data.location.localtime}`;
        document.getElementById("temperature").innerHTML = `Current Temperature: ${data.current.temp_c}°C`;
        document.getElementById("feels_like").innerHTML = `Feels Like: ${data.current.feelslike_c}°C`;
        document.getElementById("wind_speed").innerHTML = `Wind Speed: ${data.current.wind_kph} km/h`;
        document.getElementById("humidity").innerHTML = `Humidity: ${data.current.humidity}%`;
        document.getElementById("weather_description").innerHTML = `Weather: ${data.current.condition.text}`;
        var iconUrl = `https:${data.current.condition.icon}`;
        document.getElementById("weather_icon").src = iconUrl;
        document.getElementById("weather_icon").style.display = "block";
        document.getElementById("sunrise").innerHTML = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
        document.getElementById("sunset").innerHTML = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
        var maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
        var minTemp = data.forecast.forecastday[0].day.mintemp_c;
        document.getElementById("forecast").innerHTML = `Forecast: High of ${maxTemp}°C, Low of ${minTemp}°C`;
        let recommendation = "";
        let backgroundImage = "";
        
        if (data.current.temp_c <= 10) {
            recommendation = "It's cold; consider wearing warm layers and a jacket.";
            backgroundImage = "url('cold_weather.jpg')"; 
        } else if (data.current.temp_c <= 20) {
            recommendation = "It's cool; a light jacket or sweater should be enough.";
            backgroundImage = "url('cool_weather.jpg')"; 
        } else {
            recommendation = "It's warm; light, breathable clothing is recommended.";
            backgroundImage = "url('warm_weather.jpg')"; 
        }

        var clothingCard = document.getElementById("clothing_recommendation");
        clothingCard.innerHTML = `Clothing Recommendation: ${recommendation}`;
        clothingCard.style.backgroundImage = backgroundImage;
        clothingCard.style.display = "none";  
        document.getElementById("clothing_button").style.display = "block";
        var weatherCard = document.getElementById("weather_info_card");
        weatherCard.style.border = "1px solid #c0d5d7";
        weatherCard.style.display = "block";
    })
    
}



function showClothingRecommendation() {
    var clothingCard = document.getElementById("clothing_recommendation");
    if (clothingCard.style.display === "none") {
        clothingCard.style.display = "block";
    } else {
        clothingCard.style.display = "none";
    }
}
