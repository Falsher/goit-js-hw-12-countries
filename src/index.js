import countryListTpl from './templates/country-info.hbs';
import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';


const oneContry = document.querySelector('.js-country')

const searchBox = document.querySelector('.input');
const listCountries = document.querySelector('.listCountries')
searchBox.addEventListener('input', dataRetrievalInputSearchBox);
function dataRetrievalInputSearchBox(event) {
  const nameCountry = event.currentTarget.value;
  const url = ` https://restcountries.eu/rest/v2/name/${nameCountry}`;
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(countries => {
      if (countries.length >= 10) {
        alert({
          text: 'Введите более корректное название страны'
                });
      } else if (countries.length >= 2 && countries.length < 10) {
       const loadListCoutry = countries.map(function(country){
         const nameC = document.createElement('li')
         nameC.textContent = country.name;
         return nameC
       })
       listCountries.append(...loadListCoutry)
      }else{
        const infoOneCountry = countryList(countries)
        oneContry.insertAdjacentHTML('beforeend', infoOneCountry)
        function countryList(countries){
          return countryListTpl(countries)
        }
      }
    });
}
