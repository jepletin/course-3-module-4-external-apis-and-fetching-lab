// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const button = document.getElementById("fetch-alerts");

button.addEventListener("click", function () {
  const state = document.getElementById("state-input").value;
  fetchWeatherAlerts(state);
});

async function fetchWeatherAlerts(state) {
  const errorMessage = document.getElementById("error-message");

  try {
    
    if (state.trim() === "") {
      throw new Error("Please enter a state abbreviation.");
    }

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    const data = await response.json();

    console.log(data);

  
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    
    displayAlerts(data);

  } catch (error) {
    console.log(error.message);

    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
}

function displayAlerts(data) {
  const alertsDisplay = document.getElementById("alerts-display");
  const stateInput = document.getElementById("state-input");


  alertsDisplay.innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  for (let i = 0; i < data.features.length; i++) {
    const alertHeadline = document.createElement("p");
    alertHeadline.textContent = data.features[i].properties.headline;
    alertsDisplay.appendChild(alertHeadline);
  }


  stateInput.value = "";
}