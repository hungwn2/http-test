const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');

const apiKey="KXK4K6QEY6N8X7W94LQQY7D8F";

async function fetchWeather(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response=await fetch(url);
        if (!response.ok){
            throw new Error("city not found");
        }
        const data=await response.json();
        const {name}=data;
        const{temp, humidity:hum}=data.main;
        const{description:weatherDescription}=data.weather[0];
        cityName.textContent=name;
        temperature.textContent=`Temperature: ${temp}`;
        description.textContent=`Weather: ${weatherDescription}`;
        humidity.textContent=`Humdity: ${hum}`;

    }
    catch(error){
        cityName.textContent="Error";
        temperature.textContent="";
        description.textContent=error.message;
        humidity.textContent="";
    }
}
document.getElementById("searchBtn").addEventListener("click", ()=>{
const city=document.getElementById("cityInput").ariaValueMax;
getWeather(city);
}
);

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city); // Call the fetchWeather function with the input city
    }
});