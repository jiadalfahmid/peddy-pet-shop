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
   

   const categoryBtnHandler = async () => {
      try{
         const res = await fetch(
            "https://openapi.programming-hero.com/api/peddy/categories"
         );
         const data = await res.json();
         categoriesBtn(data.categories);
      } catch(error){
         console.error("Category fetching failed:", error)
      }
   };
   
   const categoriesBtn = (buttons) => {
      buttons.forEach((btn) => {
         const categoryName = btn.category.toLowerCase();
         categoryBtn.innerHTML += `
            <button id="${categoryName}" onclick="loadingTime('${categoryName}'); activeBtn('${categoryName}')" class="btn border-2 bg-white border-teal-50 hover:bg-teal-100 hover:border-teal-700 hover:rounded-full text-xl text-gray-600 py-10">
                     <div class="-mt-7 flex items-center gap-2">
                        <img src="${btn.category_icon}" alt="">
                        ${btn.category}
                     </div></button>
            `;
            
      });
      document
         .getElementById("dog")
         .classList.add("bg-teal-100", "border-teal-700", "rounded-full");
      };

      const categoriesBtn = (buttons) => {
         buttons.forEach((btn) => {
            const categoryName = btn.category.toLowerCase();
            categoryBtn.innerHTML += `
               <button id="${categoryName}" onclick="loadingTime('${categoryName}'); activeBtn('${categoryName}')" class="btn border-2 bg-white border-teal-50 hover:bg-teal-100 hover:border-teal-700 hover:rounded-full text-xl text-gray-600 py-10">
                        <div class="-mt-7 flex items-center gap-2">
                           <img src="${btn.category_icon}" alt="">
                           ${btn.category}
                        </div></button>
               `;
               
         });
         document
            .getElementById("dog")
            .classList.add("bg-teal-100", "border-teal-700", "rounded-full");
         };

         const activeBtn = (id) => {
            removeActive();
            document
               .getElementById(id)
               .classList.add("bg-teal-100", "border-teal-700", "rounded-full");
            };