let searchInput = document.getElementById("searchInput")

$("#closeBtn").click(function() { 
    let slideLinks = $("#linkesat").innerWidth()
    if ($("#side-menu").css("left")=="0px") {
        $("#side-menu").animate({left:-slideLinks},1000)
        $("#closeBtn").removeClass("fa-x")
        $("#closeBtn").addClass("fa-align-justify")
    } else {
        $(".link").slideUp("500")
        $("#side-menu").animate({left:"0px"},1000)
        $("#closeBtn").removeClass("fa-align-justify")
        $("#closeBtn").addClass("fa-x")


    }
    // console.log(slideLinks);
});





// Start DisplayMeals
mealsContainer = [] ;
async function getsMeals() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let findalData =await response.json()
    mealsContainer = findalData.meals
    // return findalData
    displayMeals()
    // console.log(findalData.meals);
}
getsMeals()
function displayMeals() {
    let cartoona = ``
    for (let i=0;i<mealsContainer.length; i++) {
        cartoona+=`<div class="w-3/4 md:w-2/5 lg:w-1/4 p-3 m-auto ms-15">
        <div   id="getDetailsMeal" class="meal   relative cursor-pointer  left-0 right-0 mb-5 group ">
            <img   src="${mealsContainer[i].strMealThumb}" class="w-screen rounded-2xl" alt="">
            <div  onclick="getDetailsMeal(${mealsContainer[i].idMeal})" class="lear-meal absolute group-hover:top-0 transition-all rounded-2xl duration-500 ease-in-out bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
                <h2 class="text-4xl text-black">${mealsContainer[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cartoona
    // console.log(mealsContainer);
}
async function getDetailsMeal(boufa) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${boufa}`)
    let finalData = await data.json();
    // console.log(finalData.meals[0]);
    specificMeal(finalData.meals[0])
} 
function specificMeal(meals)
{
    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meals[`strIngredient${i}`] && meals[`strMeasure${i}`]) {
            ingredients += `<li class="bg-cyan-100 px-6 py-1 m-2 rounded-md">${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`;
        }
    }
    
    let tags = meals.strTags?.split(",") || [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="bg-red-100 px-6 py-2 m-2 rounded-md">${tags[i]}</li>`;
    }
    
  let cartona = `

  <div class=" top-0 w-full md:w-1/3  ps-3 ">
  <img
    src="${meals.strMealThumb}"
    class="w-full rounded-lg mt-5"
    alt=" meal"/>

  <h2 class="font-bold text-4xl ps-16 md:ps-6 text-white">${meals.strMeal}</h2>
</div>
<div class=" w-2/3 mx-auto md:ps-9 md:w-2/3">
  <h2 class="text-white font-bold text-3xl">Instructions</h2>
  <p class="text-white text-lg">
  ${meals.strInstructions}
  </p>

  <h3 class="font-abold pt-4 text-white text-3xl">
    <span class="font-bold text-3xl">Area</span> :${meals.strArea}
  </h3>
  <h3 class="font-abold pt-4 text-white text-3xl">
    <span class="font-bold text-3xl">Category </span> :  ${meals.strCategory}
  </h3>
  <h3 class="font-abold pt-4 text-white text-3xl">
    <span class="font-bold text-3xl">Recipes </span> : Turkish
  </h3>

  <ul class="text-black  flex flex-row flex-wrap pt-4">
${ingredients}
  </ul>
  <h3 class="font-abold pt-4 text-white text-3xl">
    <span class="font-extrabold text-4xl">Tags  </span> :
  </h3>

  <ul class="text-black flex flex-row flex-wrap py-4">
${tagsStr}
  </ul>

  <a href=" ${meals.strSource}" class="px-3 py-2 rounded-lg ms-2 text-white  hover:bg-green-700 bg-green-600">Source</a>
  <a href=" ${meals.strYoutube}" class="px-3 py-2 rounded-lg text-white mx-1 hover:bg-red-700 bg-red-600">Youtube</a>
</div>
`
  document.getElementById("rowData").innerHTML = cartona;
}
// End DisplayMeals



// Start Search
function search() {
  // console.log("hello");
  let cartoona=`
   <div class="">
   <input onkeyup="getSearchName(this.value)" id="searchName" class="w-2/5 rounded-md py-2 px-2 border shadow-sm   ms-8 bg-black" type="text" placeholder="Search By Name">
   <input onkeyup="getSearchLetter(this.value)" id="searchLetters" class="w-2/5 rounded-md py-2 px-2 border shadow-sm   ms-8  bg-black" type="text" placeholder="Search By First Letter">
   <div id="rowDataSearch"class="flex flex-wrap"></div>
 </div>`
 document.getElementById("searchInput").innerHTML = cartoona;
}
 async function getSearchName(test) {

     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${test}`);
     let findalData = await response.json();
     mealsContainer = findalData.meals;
    //  searchNameInp()
     searchName();
}
function searchName() {
  let cartona = ``;
  if (mealsContainer && mealsContainer.length > 0) {
  for (let i = 0; i <mealsContainer.length; i++) {
    cartona += `<div class="w-3/4 md:w-2/5 lg:w-1/4 p-3 ">
      <div id="" class="meal relative cursor-pointer left-0 right-0 mb-group">
        <img src="${mealsContainer[i].strMealThumb}" class="w-screen rounded-2xl" alt="">
        <div onclick="getDetailsMeal(${mealsContainer[i].idMeal})" class="lear-meal absolute group-hover:top-transition-all duration-500 ease-in-out rounded-2xl  bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
          <h2 class="text-4xl text-black">${mealsContainer[i].strMeal}</h2>
        </div>
      </div>
    </div>`;
  }
}else{
  cartona = "<p class='bg-cyan-100 px-6 py-1  rounded-md text-2xl m-auto mt-64 text-black'>No meals found</p>";
}
  document.getElementById("rowDataSearch").innerHTML = cartona;
}
async function getSearchLetter(testt) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${testt}`);
  let findalData = await response.json();
  mealsContainer = findalData.meals;
  searchLetter(mealsContainer); // Pass mealsContainer to searchLetter
}
function searchLetter(mealsContainer) {
  let cartona = ``;
  if(mealsContainer) {
    for (let i = 0; i < mealsContainer.length; i++) {
      cartona += `<div class="w-1/4 p-3 ">
        <div id="" class="meal relative cursor-pointer left-0 right-0 mb- group">
          <img src="${mealsContainer[i].strMealThumb}" class="w-screen rounded-2xl" alt="">
          <div onclick="getDetailsMeal(${mealsContainer[i].idMeal})" class="lear-meal absolute group-hover:top-transition-all rounded-2xl duration-700 ease-in-out bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
            <h2 class="text-4xl text-black">${mealsContainer[i].strMeal}</h2>
          </div>
        </div>
      </div>`;
    }
  }else{
    cartona = "<p class='bg-cyan-100 px-6 py-1  rounded-md text-2xl m-auto mt-64 text-black'>No meals found</p>"; 
  }
  document.getElementById("rowDataSearch").innerHTML = cartona;
}
// End Search 





// // startCategory

async function getCategory(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let finalData = await response.json();
  categoryMeals(finalData.categories)
}
function categoryMeals(e){
  let cartona = ``
  for (let i=0;i<e.length; i++) {
    cartona+=`<div class="w-3/4 md:w-2/5 lg:w-1/4 p-3 ">
    <div   id="getDetailsMeal" class="meal  relative cursor-pointer  left-0 right-0 mb-5 group ">
        <img   src="${e[i].strCategoryThumb}" class="w-screen rounded-2xl" alt="">
        <div  onclick="getDetailsCatgMeal('${e[i].strCategory}')" class="lear-meal  absolute group-hover:top-0 transition-all rounded-2xl duration-500 ease-in-out bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex flex-col justfy-center items-center overflow-hidden">
            <h2 class="text-4xl text-black">${e[i].strCategory}</h2>
            <p class="text-black ">${e[i].strCategoryDescription}</p>
        </div>
    </div>
</div>`
// ${mealsContainer[i].idMeal}
  }
  document.getElementById("rowData").innerHTML=cartona;
}
async function getDetailsCatgMeal(category) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let finalData = await data.json();
  mealsContainer = finalData.meals;
  console.log(finalData.meals)
  // displayCategore(result.categories)
  displayMeals(finalData.meals);
  console.log(finalData.meals);
  // categoryMealsFilter(finalData)
}
// End Categories





// Start Area
async function getArea() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let findalData = await response.json();
  mealsContainer = findalData;
  // console.log(mealsContainer)
  area(mealsContainer.meals)
  // displayMeals(e.meals)
}
function area(e) {
  searchInput.innerHTML = ``
  let cartona = ``
    for (let i=0;i<e.length; i++) {
      cartona+=`<div onclick="getAreaMeals('${e[i].strArea}')" class="w-3/4 md:w-2/5 lg:w-1/4 p-3 m-auto mb-10 rounded-2 text-center cursor-pointer">
      <i class="fa-solid fa-house-laptop fa-4x font-black text-8xl"></i>
      <h1 class="font-bold text-3xl">${e[i].strArea}</h1>
</div>`
    }
    document.getElementById("rowData").innerHTML=cartona;
}
async function getAreaMeals(e){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e}`)
  let findalData = await response.json();
  mealsContainer = findalData.meals;
  areaMeals(mealsContainer)
  displayMeals(e.meals)
  // mealsContainer = findalData.meals;
  // getDetailsMeal(finalData.meals)
  // displayMeals(mealsContainer)
  // console.log(mealsContainer);
}
function areaMeals(){
  let cartona = ``
  for (let i=0;i<mealsContainer.length; i++) {
    cartona+=`<div class="w-1/4 p-3 ">
    <div   id="getDetailsMeal" class="meal  relative cursor-pointer  left-0 right-0 mb-5 group ">
        <img   src="${mealsContainer[i].strMealThumb}" class="w-screen rounded-2xl" alt="">
        <div  onclick="getDetailsAreaMeal()" class="lear-meal absolute group-hover:top-0 transition-all rounded-2xl duration-500 ease-in-out bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
            <h2 class="text-4xl text-black">${mealsContainer[i].strMeal}</h2>
        </div>
    </div>
</div>`
// ${mealsContainer[i].idMeal}
  }
  document.getElementById("rowData").innerHTML=cartona;
}
function getDetailsAreaMeal(bue) {
  let cartona = '';
  if (bue) {
    for (let i = 0; i < bue.length; i++) {
      cartona += `<div class="w-1/4 p-3 ">
        <div id="getDetailsMeal" class="meal relative cursor-pointer left-0 right-0 mb-5 group">
          <img src="${bue[i].strMealThumb}" class="w-screen rounded-2xl" alt="">
          <div onclick="detailsCategory('${bue[i].idMeal}')"
            class="lear-meal absolute group-hover:top-0 transition-all rounded-2xl duration-500 ease-in-out bg-white bg-opacity-70 top-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
            <h2 class="text-4xl text-black">${bue[i].strMeal}</h2>
          </div>
        </div>
      </div>`;
    }
  } 
  document.getElementById("rowData").innerHTML = cartona;
}
// End Area




// Start Ingredients
async function getIngredients() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let findalData = await response.json();
  mealsContainer = findalData;
  console.log(mealsContainer)
  ingredientsSec(mealsContainer.meals)

}
function ingredientsSec(e) {
  let cartona = ``
    for (let i=0;i<e.length; i++) {
      cartona+=`<div onclick="getIngredientsMeals('${e[i].strIngredient}')" class=" w-3/4 md:w-2/5 lg:w-1/4 p-3 m-auto mb-10 rounded-2 text-center cursor-pointer">
      <i class="fa-solid fa-drumstick-bite fa-4x font-black text-8xl"></i>
      <h1 class="font-semibold text-2xl">${e[i].strIngredient}</h1>
      <p class="mt-2 mx-3 ">The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of</p>
</div>`
// .split(" ").slice(0, 20).join(" ")
    }

    document.getElementById("rowData").innerHTML=cartona;
}
async function getIngredientsMeals(e){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e}`)
  let findalData = await response.json();
  mealsContainer = findalData.meals;
  displayMeals(e.meals)
}
// End Ingredients




// Start Contact Us
function getContact(){
  
  let cartona=`<div class="container w-4/5 text-center me-9 mt-56 m-auto">
  <div class="flex flex-wrap  gap-4 m-auto">
      <!-- Name Input -->
      <div class="w-2/5">
          <input id="nameInp" onkeyup="inputsValidation()" type="text" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Enter Your Name">
          <div id="hambozoName" class="text-red-600 mt-2 hidden">
              Special characters and numbers not allowed
          </div>
      </div>
      <div class="w-2/5">
          <input id="emailInp" onkeyup="inputsValidation()" type="email" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Enter Your Email">
          <div id="hambozoEmail" class="text-red-600 mt-2 hidden">
              Email not valid *example@gamil.com*
          </div>
      </div>
      <div class="w-2/5">
          <input id="phoneInp" onkeyup="inputsValidation()" type="text" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Enter Your Phone">
          <div id="hambozoPhone" class="text-red-600 mt-2 hidden">
              Enter valid Phone Number
          </div>
      </div>
      <div class="w-2/5">
          <input id="ageInp" onkeyup="inputsValidation()" type="number" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Enter Your Age">
          <div id="hambozoAge" class="text-red-600 mt-2 hidden">
              Enter valid age
          </div>
      </div>
      <div class="w-2/5">
          <input id="passwordInp" onkeyup="inputsValidation()" type="password" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Enter Your Password">
          <div id="hambozoPass" class="text-red-600 mt-2 hidden">
              Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
      </div>
      <div class="w-2/5">
          <input id="repasswordInp" onkeyup="inputsValidation()" type="password" class="border bg-gray-300  rounded-md px-4 py-2 w-full" placeholder="Repassword">
          <div id="hambozoRePass" class="text-red-600 mt-2 hidden">
              Enter valid repassword 
          </div>
      </div>
  </div>
  <button  id="hambozoSubmitBtn" disabled class="me-40 mt-7 bg-transparent border border-red-700 text-red-700 px-5 py-2 rounded-md ">Submit</button>
</div>`
document.getElementById("rowData").innerHTML = cartona
submitBtn = document.getElementById("hambozoSubmitBtn")


  document.getElementById("nameInp").addEventListener("focus", () => {
    nameInputTest = true
  })

  document.getElementById("emailInp").addEventListener("focus", () => {
    emailInputTest = true
  })

  document.getElementById("phoneInp").addEventListener("focus", () => {
    phoneInputTest = true
  })

  document.getElementById("ageInp").addEventListener("focus", () => {
    ageInputTest = true
  })

  document.getElementById("passwordInp").addEventListener("focus", () => {
    passwordInputTest = true
  })

  document.getElementById("repasswordInp").addEventListener("focus", () => {
    repasswordInputTest = true
  })
}
let nameInputTest = false;
let emailInputTest = false;
let phoneInputTest = false;
let ageInputTest = false;
let passwordInputTest = false;
let repasswordInputTest = false;

function inputsValidation() {
  if (nameInputTest) {
    if (nameValidation()) {

      document.getElementById("hambozoName").classList.replace("block", "hidden")

    } else {
      document.getElementById("hambozoName").classList.replace("hidden", "block")

    }
  }
  if (emailInputTest) {

    if (emailValidation()) {
      document.getElementById("hambozoEmail").classList.replace("block", "hidden")
    } else {
      document.getElementById("hambozoEmail").classList.replace("hidden", "block")

    }
  }
  if (phoneInputTest) {
    if (phoneValidation()) {
      document.getElementById("hambozoPhone").classList.replace("block", "hidden")
    } else {
      document.getElementById("hambozoPhone").classList.replace("hidden", "block")
    }
  }
  if (ageInputTest) {
    if (ageValidation()) {
      document.getElementById("hambozoAge").classList.replace("block", "hidden")
    } else {
      document.getElementById("hambozoAge").classList.replace("hidden", "block")

    }
  }
  if (passwordInputTest) {
    if (passwordValidation()) {
      document.getElementById("hambozoPass").classList.replace("block", "hidden")
    } else {
      document.getElementById("hambozoPass").classList.replace("hidden", "block")
    }
  }
  if (repasswordInputTest) {
    if (repasswordValidation()) {
      document.getElementById("hambozoRePass").classList.replace("block", "hidden")
    } else {
      document.getElementById("hambozoRePass").classList.replace("hidden", "block")
    }
  }


  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInp").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInp").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInp").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInp").value))
}

function passwordValidation() {
  return (/^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInp").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInp").value == document.getElementById("repasswordInp").value
}