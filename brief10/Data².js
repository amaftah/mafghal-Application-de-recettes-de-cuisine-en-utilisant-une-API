start();
function start(){

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

