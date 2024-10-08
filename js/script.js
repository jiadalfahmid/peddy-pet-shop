const categoryBtn = document.getElementById("categoryBtn");
const loading = document.getElementById("loading");
const cards = document.getElementById("cards");
const liked = document.getElementById("liked");
const detailedModal = document.getElementById("my_modal_5");
const sortBtn = document.getElementById("sortBtn");
let clicked = false;
const countdown = document.getElementById("countdown");
const modal = document.getElementById("my_modal_4");
let countdownTime = 3;

const loadingTime = (pets) => {
   loading.classList.remove("hidden");
   cards.innerHTML = `<div></div><div></div><div id="loading" class="self-center loading loading-dots loading-lg"></div>`;
   
   setTimeout(() => {
      allPetCategory(pets);
   }, 2000);
   };
   