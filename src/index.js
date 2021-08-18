import './sass/main.scss';
import singleCountryTpl from './partials/singleCountry.hbs';
import resultCountriesTpl from './partials/resultCountries.hbs';
import API from './js/api-service.js';
const debounce = require('lodash.debounce');

const refs = {
  wrapper: document.getElementById('wrapper'),
  searchForm: document.getElementById('search-form'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const searchQuery = event.target.value;

  API.fetchCountries(searchQuery)
    .then(arrayCountry => {
      const lengthCountry = arrayCountry.length;

      if (lengthCountry == 1) {
        return renderSingleCountry(arrayCountry);
      } else if (lengthCountry >= 2 && lengthCountry < 10) {
        return renderResultCountries(arrayCountry);
      }
      alert('больше чем 10 стран подошедших под критерий');
    })
    .catch(onFetchError);
}

function renderSingleCountry(country) {
  const template = singleCountryTpl(country[0]);
  refs.wrapper.innerHTML = template;
}
function renderResultCountries(countries) {
  const template2 = resultCountriesTpl(countries);
  refs.wrapper.innerHTML = template2;
}

function onFetchError() {
  refs.wrapper.innerHTML = '';
  // alert('Такой страны не существует');
}
