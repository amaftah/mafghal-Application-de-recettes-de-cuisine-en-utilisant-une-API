var result = document.getElementById("randomCards");
var searchBtn = document.getElementById("searchBtn");
var cardsResult=document.getElementById("cardsResult");
var userInput= document.getElementById("userInput");

userInput.addEventListener("input",searchFunct);


for(let i=0; i<9 ; i++) {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response)=> response.json())
        .then((data)=>{
            
            data.meals.forEach((meal) => {

                var html;
                html = "<div class = 'card text-center col-lg-3 col-md-5 cold-sm-10 m-1 ' id='cardsHere'     style='background-color: rgb(3, 3, 3, 0.8)'>" +
                "<img src=" +
                meal.strMealThumb +
                " class='card-img-top img-fluid mx-0 '>" +
                "<div class='card-body'><h6 class='card-title text-light' style='min-height:59px;'>" +
                meal.strMeal +
                "</h6>" +
                "<a href='#' class='show btn btn-primary border-light mb-0 w-75' data-bs-toggle='modal data-bs-target='#exampleModal' style='background-color: rgb(3, 3, 3, 0.8)' id='" +
                meal.idMeal +
                "' onclick ='linkdetails(" +
                meal.idMeal +
                ")' >Details</a>" +
                "</div></div>";

                
                cardsResult.insertAdjacentHTML('afterbegin', html);
        });
    
    });
}


function searchFunct(){

    let searchMatch = userInput.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMatch}`)
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        while (cardsResult.hasChildNodes())
        cardsResult.removeChild(cardsResult.firstChild);
  
        if (data.meals) {
          data.meals.forEach((meal) => {
            html =
            "<div class = 'card text-center col-lg-3 col-md-5 cold-sm-10 m-1 ' id='cardsHere'     style='background-color: rgb(3, 3, 3, 0.8)'>" +
            "<img src=" +
            meal.strMealThumb +
            " class='card-img-top img-fluid mx-0 '>" +
            "<div class='card-body'><h6 class='card-title text-light' style='min-height:59px;'>" +
            meal.strMeal +
            "</h6>" +
            "<a href='#' class='show btn btn-primary border-light mb-0 w-75' data-bs-toggle='modal data-bs-target='#exampleModal' style='background-color: rgb(3, 3, 3, 0.8)' id='" +
            meal.idMeal +
            "' onclick ='linkdetails(" +
            meal.idMeal +
            ")' >Details</a>" +
            "</div></div>";
  
            cardsResult.insertAdjacentHTML("afterbegin", html);
          });
        }
      });
    
}

function linkdetails(mealId){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then((response) => response.json())
  .then((idData)  => receipeModal(idData.meals));
}

function receipeModal(meal){
meal = meal[0];
let count = 1;
let Ingredients = "";

for (let i in meal) {

  console.log(meal["strIngredient" + count]);
  while (meal["strIngredient" + count] !== "") {
    Ingredients += "<li>" + meal["strIngredient" + count] + "</li>";
    count++;
  }  
}
let html =
"<div class='modal fade m-auto' aria-labelledby='exampleModalLabel' id='exampleModal' tabindex='-1' style='display:flex; opacity:1; aria.hidden='true'><div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>" +
"<div class='modal-content'><div class ='modal-body'><div class='modal-header'><h1 class='modal-title fs-5' id='exampleModalLabel'>" +
meal.strMeal +
"</h1>" +
"<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div>" +
"<div class='modal-body'>" +
"<img src=" +
meal.strMealThumb +
" class='img-thumbnail ' style='height:200px;'>" +
"<h4>" +
meal.strCategory +
"</h4>" +
"<h4>" +
meal.strArea +
"</h4>" +
"<ul>" +
Ingredients +
"</ul>" +
"<h4>" +
meal.strInstructions +
"</h4>" +
"</div></div></div></div>";

document.getElementById("searchResult").insertAdjacentHTML("afterend", html);

document.querySelector(".btn-close").addEventListener("click", () => {
document.getElementById("exampleModal").style.display = "none";

});

}







