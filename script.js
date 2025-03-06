async function fetchWeather() {
    let city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city!");
        return;
    }

    let response = await fetch(`/get_weather?city=${city}`);
    let data = await response.json();

    if (data.success) {
        document.getElementById("weather-info").innerHTML = `
            <p>🌡 Temperature: ${data.temperature} °C</p>
            <p>💧 Humidity: ${data.humidity} %</p>
            <p>🌧 Rainfall: ${data.rainfall} mm</p>
        `;
        document.getElementById("temperature").value = data.temperature;
        document.getElementById("humidity").value = data.humidity;
        document.getElementById("rainfall").value = data.rainfall;
    } else {
        alert("⚠ Error fetching weather data. Try again.");
    }
}

// Ensure weather data is available before form submission
document.getElementById("crop-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    let temperature = document.getElementById("temperature").value;
    let humidity = document.getElementById("humidity").value;
    let rainfall = document.getElementById("rainfall").value;

    // Prevent submission if weather fields are empty
    if (!temperature || !humidity || !rainfall) {
        alert("⚠ Please fetch weather data before recommending a crop!");
        return;
    }

    let formData = new FormData(this);
    let response = await fetch("/recommend_crop", {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    if (data.success) {
        document.getElementById("result").innerHTML = `<h3>🌾 Recommended Crop: ${data.recommended_crop}</h3>`;
    } else {
        alert("❌ Error: " + data.error);
    }
});
