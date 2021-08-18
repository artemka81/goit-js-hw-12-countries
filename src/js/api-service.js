const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

export default { fetchCountries };
