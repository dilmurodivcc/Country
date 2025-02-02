const backButton = document.getElementById("back");
const countCard = document.getElementById("country-card");

async function fetchCountryData() {
  const selectedCountry = localStorage.getItem("selectedCountry");
  if (selectedCountry) {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${selectedCountry}`
    );
    const data = await response.json();
    const count = data[0];
    const countCard = document.createElement("div");
    countCard.classList.add("count-card");
    countCard.innerHTML = `
      <img src="${count.flags.svg}" alt="${count.name.common} flag">
      <div class="count-info">
        <h3>${count.name.common}</h3> 
        <div class="info">
          <div class="right">
         <p><strong>Native Name:</strong> ${count.name.common}</p>
         <p><strong>Population:</strong> ${count.population.toLocaleString()}</p>
         <p><strong>Region:</strong> ${count.region}</p>
         <p><strong>Sub Region:</strong> ${count.subregion}</p>
         <p><strong>Capital:</strong> ${count.capital}</p>
     </div>
     <div class="left">
        <p><strong>Top Level Domain:</strong> ${count.tld}</p>
        <p><strong>Currencies:</strong> ${
          Object.values(count.currencies)[0].name
        }</p>
        <p><strong>Languages:</strong> ${Object.values(count.languages).join(
          ", "
        )}</p>
    </div>
    </div>
    <div class="border">
    <strong>Border Countries:</strong>
    <div class="border-countries">
    ${count.borders.map((border) => `<button class="border-country">${border}</button>`).join(" ")}
    </div>
    </div>
    </div>
    `;
    document.body.appendChild(countCard);
  }
}

fetchCountryData();

backButton.addEventListener("click", () => {
  window.location.href = "./index.html";
  localStorage.removeItem("selectedCountry");
});

if (localStorage.getItem("mode") === "light") {
  document.body.classList.add("light");
  mode.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

mode.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    mode.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    localStorage.setItem("mode", "light");
  } else {
    mode.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    localStorage.setItem("mode", "dark");
  }
});
