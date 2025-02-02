const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const mode = document.getElementById("mode");
const sort = document.getElementById("sort");
let selectedCountry;

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  const savedSearch = localStorage.getItem("searchTerm") || "";
  const savedRegion = localStorage.getItem("region") || "all";
  searchInput.value = savedSearch;
  regionFilter.value = savedRegion;
  let filteredCountries = countries;
  if (savedSearch) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(savedSearch.toLowerCase())
    );
  }
  if (savedRegion !== "all") {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === savedRegion
    );
  }

  displayCountries(filteredCountries);
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
      <div class="country-info">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "N/A"
        }</p>
      </div>
    `;
    countryCard.addEventListener("click", () => {
        localStorage.setItem("selectedCountry", country.name.common);
        window.location.href = "./fullinfo.html";
      });
    countriesContainer.appendChild(countryCard);
 
      
  });
}


searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  localStorage.setItem("searchTerm", searchTerm);

  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  displayCountries(filteredCountries);
});

regionFilter.addEventListener("change", async () => {
  const region = regionFilter.value;
  localStorage.setItem("region", region);

  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  let filteredCountries = countries;
  if (region !== "all") {
    filteredCountries = countries.filter(
      (country) => country.region === region
    );
  }

  displayCountries(filteredCountries);
});

sort.addEventListener("change", async () => {
  const sortValue = sort.value;
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  let sortedCountries;
  if (sortValue === "az") {
    sortedCountries = countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  } else if (sortValue === "za") {
    sortedCountries = countries.sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
  } else if (sortValue === "population") {
    sortedCountries = countries.sort((a, b) => b.population - a.population);
  }
  displayCountries(sortedCountries);
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

fetchCountries();
