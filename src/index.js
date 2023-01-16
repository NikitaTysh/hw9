import './css/styles.css';
import { debounce } from 'lodash'
import {  fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix';
Notify.init({
  cssAnimationDuration: 400,
  timeout: 2000,
  width: '430px',
  failure: {
    background: '#f56d32',
  },
});
const DEBOUNCE_DELAY = 300;


export const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(foo, DEBOUNCE_DELAY));

function foo(event) {
  const name = event.target.value.trim();
  if (!name.length) {
    refs.listEl.innerHTML = '';
    refs.infoEl.innerHTML = '';
    return
  }
  fetchCountries(name).then(data => {
    if (!(data.length-1)) {
      refs.listEl.innerHTML = '';
      markupCountry(data);
    } else if (data.length <= 10) {
      refs.infoEl.innerHTML = '';
      markupCountrys(data)
    } else {
      Notify.info('Too many matches found. Please enter a more specific name.');
      refs.listEl.innerHTML = '';
      refs.infoEl.innerHTML = '';
    }
  }).catch(error => {
    refs.listEl.innerHTML = '';
    refs.infoEl.innerHTML = '';
    Notify.failure('Oops, there is no country with that name.')
  });
}

function markupCountry(country) {
  const markup = country.map(country => 
    `<img class="item-flag" src="${country.flags.svg}" alt="flag" width="100" >
    <h2 class="item-country">${country.name}</h2>
    <p class="item-capital"><span class="item-span">Capital: </span>${country.capital}</p>
    <p class="item-population"><span class="item-span">Population: </span>${country.population}</p>
    <p class="item-languages"><span class="item-span">Languages: </span>${country.languages.map(ln => ln.name).join('/')}</p>
    `
  ).join('');
  refs.infoEl.innerHTML = markup;
}
// по свободе сделать рудьюсом 
function markupCountrys(countrys) {
  const markup = countrys.map(country => 
    `<li class="country-item">
    <img class="item-flag" src="${country.flags.svg}" alt="flag" width="40" >
    <h2 class="item-country">${country.name}</h2>
  </li>`
  ).join('');
  refs.listEl.innerHTML = markup;
}



