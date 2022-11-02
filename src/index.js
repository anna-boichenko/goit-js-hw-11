import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { debounce } from "debounce";
import searchPhotos from './js/searchPhotos';
import doMarkup from './js/doMarkup';
import axios from 'axios';


const searchForm = document.querySelector("#search-form");
// const submitBtn = document.querySelector("");
const loadBtn = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

const DEBOUNCE_DELAY = 300;

let searchValue = '';
let pageNum = 1;

loadBtn.hidden = true;


searchForm.addEventListener("submit", onSearch);
searchForm.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));
loadBtn.addEventListener("click", onLoad);


function clearSearch() {
    gallery.innerHTML = '';
}

function onSearch(evt){
evt.preventDefault();
loadBtn.hidden = false;
clearSearch()
searchValue = evt.currentTarget.elements.searchQuery.value;

if(!searchValue){
   loadBtn.hidden = true;
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
   }
   pageNum = 1;
   searchPhotos(searchValue, pageNum).then(doMarkup); 
}

function onLoad() {
   pageNum += 1;
   doMarkup(searchValue, pageNum)
     .then(doMarkup)
     .catch(data => {
       loadBtn.hidden = true;
       Notiflix.Notify.info(
         `We're sorry, but you've reached the end of search results.`
       );
     });
 }
 

function onInput(evt) {
    evt.preventDefault();
    clearSearch();

    searchValue = evt.target.value.trim();
}

// function clearSearch() {
//     gallery.innerHTML = '';
// }
