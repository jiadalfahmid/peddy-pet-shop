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

const activeBtn = (id) => {
removeActive();
document
   .getElementById(id)
   .classList.add("bg-teal-100", "border-teal-700", "rounded-full");
};

const sortBtnClicked = () => {
clicked = true;
removeActive();
document
   .getElementById("dog")
   .classList.add("bg-teal-100", "border-teal-700", "rounded-full");
loadingTime();
};

const allPetCategory = async (petCategory) => {
loading.classList.add("hidden");
if (clicked) {
   const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/${
      petCategory ? `category/${petCategory}` : "pets"
      }`
   );
   const data = await res.json();
   const sortedPets = sortByPrice(data.data || data.pets);
   petsList(sortedPets);
} else {
   const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/${
      petCategory ? `category/${petCategory}` : "pets"
      }`
   );
   const data = await res.json();
   petsList(data.data || data.pets);
}
};

const sortByPrice = (pets) => {
return pets.sort((a, b) => b.price - a.price);
};

const petsList = (pets) => {
cards.innerHTML = "";
if (pets.length === 0) {
   cards.classList.remove("grid");
   cards.innerHTML = `
      <div id="errorCard" class="bg-slate-100 py-8 flex flex-col justify-center items-center rounded-lg gap-5 px-4">
               <img src="./images/error.webp" alt="">
               <h3 class="text-2xl font-bold">No Information Available</h3>
               <p class="text-center lg:w-1/2">It looks like we currently don’t have any pets listed in this category. But don’t worry—our inventory is constantly being updated!</p>
            </div>
      `;
}
pets.forEach((pet) => {
   cards.classList.add("grid");
   cards.innerHTML += `
      <div id="card-${
      pet.petId
      }" class="border-gray-300 p-5 border rounded-md flex flex-col">
                  <img src="${
                  pet.image
                  }" alt="" class="rounded-md lg:h-40 object-cover">
                  <div class="info space-y-2">
                     <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
                     <div class="flex gap-2 items-center text-gray-700">
                        <i class="fa-light fa-paw"></i>
                        <p>Breed: ${pet.breed ? pet.breed : "To be updated"}</p>
                     </div>
                     <div class="flex gap-2 items-center text-gray-700">
                        <i class="fa-light fa-calendar"></i>
                        <p>Birth: ${
                        pet.date_of_birth ? pet.date_of_birth : "Unknown"
                        }</p>
                     </div>
                     <div class="flex gap-2 items-center text-gray-700">
                        <i class="fa-light fa-mercury"></i>
                        <p>Gender: ${
                        pet.gender ? pet.gender : "To be updated"
                        }</p>
                     </div>
                     <div class="flex gap-2 items-center text-gray-700">
                        <i class="fa-light fa-dollar"></i>
                        <p>Price: ${
                        pet.price ? `${pet.price}$` : "Contact us for details"
                        }</p>
                     </div>
                  </div>
                  <!-- Card Buttons starts -->
                  <div class="flex justify-between mt-4 border-t-2 pt-4">
                     <button onclick="likedPet(${
                     pet.petId
                     })" class='btn bg-white border border-teal-100 text-xl'><i class="fa-light fa-thumbs-up"></i></button>
                     <button id="${pet.petId}" onclick="openModal(${
                        pet.petId
                     })" class='btn bg-white border border-teal-100 text-xl text-teal-800'>Adopt</button>
                     <button onclick="my_modal_5.showModal(); petById(${
                     pet.petId
                     })" class='btn bg-white border border-teal-100 text-xl text-teal-800'>Details</button>
                  </div>
               </div>
      `;
});
};

const petById = async (id) => {
const res = await fetch(
   `https://openapi.programming-hero.com/api/peddy/pet/${id}`
);
const data = await res.json();
petDetails(data.petData);
};

const likedPet = async (id) => {
const res = await fetch(
   `https://openapi.programming-hero.com/api/peddy/pet/${id}`
);
const data = await res.json();
const image = data.petData.image;
liked.innerHTML += `
   <img src="${image}" alt="" class="rounded-lg h-32 w-full lg:h-24 object-cover">
   `;
return;
};

const petDetails = (pet) => {
detailedModal.innerHTML = `
      <div class="modal-box">
               <img src="${pet.image}" alt="" class="rounded-xl w-full">
                        <div class="info space-y-2">
                           <h3 class="text-xl font-bold mt-5">${
                           pet.pet_name
                           }</h3>
                           <div class="grid grid-cols-2">
                              <div class="flex gap-2 items-center text-gray-700">
                                 <i class="fa-light fa-paw"></i>
                                 <p>Breed: ${
                                 pet.breed ? pet.breed : "To be updated"
                                 }</p>
                              </div>
                              <div class="flex gap-2 items-center text-gray-700">
                                 <i class="fa-light fa-calendar"></i>
                                 <p>Birth: ${
                                 pet.date_of_birth
                                    ? pet.date_of_birth
                                    : "Unknown"
                                 }</p>
                              </div>
                              <div class="flex gap-2 items-center text-gray-700">
                                 <i class="fa-light fa-venus-mars"></i>
                                 <p>Gender: ${
                                 pet.gender ? pet.gender : "To be updated"
                                 }</p>
                              </div>
                              <div class="flex gap-2 items-center text-gray-700">
                                 <i class="fa-light fa-dollar"></i>
                                 <p>Price: ${
                                 pet.price
                                    ? `${pet.price}$`
                                    : "Contact us for details"
                                 }</p>
                              </div>
                              <div class="flex gap-2 items-center text-gray-700 col-span-2">
                                 <i class="fa-light fa-syringe"></i>
                                 <p>Vaccinated status: ${
                                 pet.vaccinated_status
                                    ? pet.vaccinated_status
                                    : "To be updated"
                                 }</p>
                              </div>
                           </div>
                           <h3 class="text-lg font-bold">Details Information</h3>
                           <p>${pet.pet_details}</p>
                        </div>
               <div class="modal-action w-full">
                  <form method="dialog" class="w-full">
                  <button class="btn w-full bg-teal-50 text-teal-700">Close</button>
                  </form>
               </div>
            </div>
      `;
};

const countDownTimer = () => {
countdownTime = 3;
countdown.textContent = countdownTime;
const countdownInterval = setInterval(() => {
   countdownTime -= 1;
   countdown.textContent = countdownTime;

   if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      modal.close();
   }
}, 1000);
};

const openModal = (id) => {
let petId = document.getElementById(id);
petId.innerText = "Adopted";
modal.showModal();
countDownTimer();
};

const removeActive = () => {
document
   .getElementById("cat")
   .classList.remove("bg-teal-100", "border-teal-700", "rounded-full");
document
   .getElementById("dog")
   .classList.remove("bg-teal-100", "border-teal-700", "rounded-full");
document
   .getElementById("rabbit")
   .classList.remove("bg-teal-100", "border-teal-700", "rounded-full");
document
   .getElementById("bird")
   .classList.remove("bg-teal-100", "border-teal-700", "rounded-full");
};

categoryBtnHandler();
loadingTime();
