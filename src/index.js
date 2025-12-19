import debounce from "lodash.debounce";
import fetchCountries from "./js/fetchCountries";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import Handlebars from 'handlebars';
import countryList from "bundle-text:./template/country-list.hbs"
import countryCard from "bundle-text:./template/country-card.hbs"

const countryListTemplate = Handlebars.compile(countryList);
const countryCardTemplate = Handlebars.compile(countryCard);


const inputDom = document.querySelector(".js-search");
const resultDom = document.querySelector(".js-result");

const showNotice = (message) => {
    error({
        text: message,
        delay: 2000,
    })
}
const search = (e) => {
  const query = e.target.value;

  if (!query) {
    resultDom.innerHTML = "";
    return;
  }

  fetchCountries(query)
    .then(handleCountries)
    .catch((error) => {
        resultDom.innerHTML = ""
    });
};
inputDom.addEventListener("input", debounce(search, 500))


const renderCountryList = (countries) =>{
    resultDom.innerHTML = countryListTemplate(countries);
}
const renderCountryCard = (country) =>{
    resultDom.innerHTML = countryCardTemplate(country);
}

const handleCountries = (countries) => {
    resultDom.innerHTML = "";

    if(countries.length > 10) {
        showNotice("Too many matches found. Please enter a more specific query!")
        return
    }
    if(countries.length >= 2) {
        renderCountryList(countries)
        return
    }
    if(countries.length === 1) {
        renderCountryCard(countries[0])
    }
}


