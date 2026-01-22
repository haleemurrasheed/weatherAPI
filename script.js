// 1. Get elements
const button = document.getElementById('get-weather-btn');
const input = document.getElementById('city-input');
const result = document.getElementById('weather-result');

// 2. Add click event
button.addEventListener('click', function () {
  const city = input.value.trim();

  if (city === '') {
    result.textContent = '⚠️ Please enter a city name!';
    return;
  }

  getWeather(city);
});

// 3. Fetch weather function
async function getWeather(city) {
  const apiKey = API_KEY; // ⚠️ PUT YOUR KEY HERE!
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric`;

  result.textContent = '🔄 Loading...';

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.days[0].temp;
    const feelsLike = data.days[0].feelslike;
    const conditions = data.days[0].conditions;
    const description = data.days[0].description;
    const humidity = data.days[0].humidity;

    result.innerHTML = `
      <h2>🌍   ${data.resolvedAddress}</h2>
      <p>🌡️   <strong>Temperature:</strong> ${temp}°C</p>
      <p>🤚   <strong>Feels Like:</strong> ${feelsLike}°C</p>
      <p>☁️   <strong>Conditions:</strong> ${conditions}</p>
      <p>📝   <strong>Description:</strong> ${description}</p>
      <p>💧   <strong>Humidity:</strong> ${humidity}%</p>
    `;
  } catch (error) {
    result.textContent = '❌ Error! City not found or invalid API key.';
    console.error(error);
  }
}
