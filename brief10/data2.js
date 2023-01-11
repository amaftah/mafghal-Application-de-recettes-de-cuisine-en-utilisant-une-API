open();
function open(){

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
.then((response) => response.json())
.then( (data) => {
    let areas;

    data.meals.reverse().forEach(meal => {
        if(meal.strArea=='Moroccan'){
            areas = "<option value='"+meal.strArea+"' selected>"+meal.strArea+"</option>";
        }else{
            areas = "<option value='"+meal.strArea+"'>"+meal.strArea+"</option>";
        }
        
        document.getElementById("areaSelection").insertAdjacentHTML("afterbegin", areas);

    })
})

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
.then((response) => response.json())
.then( (data) => {
    let category;
    data.meals.reverse().forEach(meal => {
        
        if(meal.strCategory=='Lamb'){
            category = "<option value='"+meal.strCategory+"' selected>"+meal.strCategory+"</option>";
        }else{
            category = "<option value='"+meal.strCategory+"'>"+meal.strCategory+"</option>";
        }
        
        document.getElementById("categorySelection").insertAdjacentHTML("afterbegin", category);
    })
})
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function filterMeals(){
    
    var categorySelection = document.getElementById("categorySelection");
    var areaSelection = document.getElementById("areaSelection");

    var selectedCategory = categorySelection.options[categorySelection.selectedIndex].value;
    var selectedArea = areaSelection.options[areaSelection.selectedIndex].value;
    removeAllChildNodes(selectedResult);
    if(selectedCategory==="" && selectedArea!==""){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
        .then((response) => response.json())
        .then((areaf)=>{
            removeAllChildNodes(selectedResult);
            areaf.meals.forEach((meal) =>{
          

                            var html;
                            html = "<div class = 'card text-center col-lg-3 col-md-5 cold-sm-10 m-1 ' id='cardsHere'     style='background-color: rgb(14, 13, 13, 0.8)'>" +
                            "<img src=" +
                            meal.strMealThumb +
                            " class='card-img-top img-fluid mx-0 '>" +
                            "<div class='card-body'><h6 class='card-title text-light' style='min-height:59px;'>" +
                            meal.strMeal +
                            "</h6>" +
                            "<a href='#' class='show btn btn-primary border-light mb-0 w-75' data-bs-toggle='modal data-bs-target='#exampleModal' style='background-color: rgb(14, 13, 13, 0.8)' id='" +
                            meal.idMeal +
                            "' onclick ='linkdetails(" +
                            meal.idMeal +
                            ")' >Details</a>" +
                            "</div></div>";
                
                            selectedResult.insertAdjacentHTML("afterbegin", html);
                         })
        })
}else if(selectedCategory!=="" && selectedArea===""){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then((response) => response.json())
        .then((cateF)=>{
            removeAllChildNodes(selectedResult);
            cateF.meals.forEach((meal) =>{
          

                            var html;
                            html = "<div class = 'card text-center col-lg-3 col-md-5 cold-sm-10 m-1 ' id='cardsHere'     style='background-color: rgb(14, 13, 13, 0.8)'>" +
                            "<img src=" +
                            meal.strMealThumb +
                            " class='card-img-top img-fluid mx-0 '>" +
                            "<div class='card-body'><h6 class='card-title text-light' style='min-height:59px;'>" +
                            meal.strMeal +
                            "</h6>" +
                            "<a href='#' class='show btn btn-primary border-light mb-0 w-75' data-bs-toggle='modal data-bs-target='#exampleModal' style='background-color: rgb(14, 13, 13, 0.8)' id='" +
                            meal.idMeal +
                            "' onclick ='linkdetails(" +
                            meal.idMeal +
                            ")' >Details</a>" +
                            "</div></div>";
                
                            selectedResult.insertAdjacentHTML("afterbegin", html);
                         })
        })
}else if (selectedCategory!=="" && selectedArea!==""){
  
const [a, b] = await Promise.all([
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`),
    fetch(` https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
  ]);

  const [areaF, cateF] = await Promise.all([a.json(), b.json()]);
  const areaFMeals = areaF.meals;
  const cateFMeals = cateF.meals;
  const mergedMeals = [];
  for (let  i = 0; i < areaFMeals.length; i++) {
    for (let  j = 0; j < cateFMeals.length; j++) {
        if (areaFMeals[i].idMeal == cateFMeals[j].idMeal) {

          
            mergedMeals.push(areaFMeals[i]);
}}} 
for (let i = 0; i < mergedMeals.length; i++) {
    var html;
    html = "<div class = 'card text-center col-lg-3 col-md-5 cold-sm-10 m-1 ' id='cardsHere'     style='background-color: rgb(14, 13, 13, 0.8)'>" +
    "<img src=" +
    mergedMeals[i].strMealThumb +
    " class='card-img-top img-fluid mx-0 '>" +
    "<div class='card-body'><h6 class='card-title text-light' style='min-height:59px;'>" +
    mergedMeals[i].strMeal +
    "</h6>" +
    "<a href='#' class='show btn btn-primary border-light mb-0 w-75' data-bs-toggle='modal data-bs-target='#exampleModal' style='background-color: rgb(14, 13, 13, 0.8)' id='" +
    mergedMeals[i].idMeal +
    "' onclick ='linkdetails(" +
    mergedMeals[i].idMeal +
    ")' >Details</a>" +
    "</div></div>";

    selectedResult.insertAdjacentHTML("afterbegin", html);
}
}}