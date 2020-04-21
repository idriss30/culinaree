//All Dom  items will be stored in an object ;
let Dom ={
    searchLogo : document.querySelector(".search"),
    SearchInput : document.querySelector(".searching__input"),
    recipe__search: document.querySelector(".recipe__search"),
    closeSearch: document.querySelector(".recipe__search-close"),
    searchSectionContainer : document.querySelector(".recipe__search-main-container"),
    searchSectioninput: document.querySelector(".recipe__search-input"),
    jokeButton: document.querySelector(".random__joke-button"),
    jokeText : document.querySelector(".random__joke-text"),
    guideView : document.querySelector(".emergency__guide-link"),
    emergencyGuide : document.querySelector("#emergency"),
    sectionFullGuide : document.querySelector(".full__guide"),
    sectionVegetarian: document.querySelector("#vegetarian"),
    sectionWeightLoss: document.querySelector("#weight"),
    sectionHealthy: document.querySelector("#healthy"),
    sectionPopular: document.querySelector("#popular"),
    recipeShowing : document.querySelector(".showing__container"),
    showingRecipe : document.querySelector(".showing__recipe"),
    searchingSection: document.querySelector(".searching"),
    jokeSection: document.querySelector(".random__joke"),
    recipe__anchor: document.querySelectorAll(".recipes__anchor"),
    recipe_link: document.querySelectorAll(".recipe__link"),
    oneRecipeSection: document.querySelector(".oneRecipe"),
    oneRecipe__image : document.querySelector(".oneRecipe__image"),
    oneRecipe__details : document.querySelector(".oneRecipe__details"),
    oneRecipe__summary : document.querySelector(".oneRecipe__summary"),
    oneRecipe__equipments : document.querySelector(".oneRecipe__equipments"),
    oneRecipe__instructions : document.querySelector(".oneRecipe__instructions"),
    similar_Recipe : document.querySelector(".similar__Recipe"),
    oneRecipe__summary_list: document.querySelector(".oneRecipe__summary-list"),
    rightArrow : document.querySelector(".rightArrow"),
    leftArrow : document.querySelector(".leftArrow"),
    uniqueRecipe: document.querySelectorAll(".col-20"),
    sectionButton : document.querySelector(".showing__recipe-button")
    
    

}

let url;
let attr;
let api = "apiKey=fb17311e451246b9b70d522b4f8b9f24";
let recipeResult;
let count;
let count1;
// create an event listener to make showing recipe work;

Dom.sectionButton.addEventListener("click", ()=>{
     location.reload();
})

// create a function to add section 
let hideSection = ()=>{
    Dom.sectionHealthy.style.display ="none"
    Dom.sectionPopular.style.display ="none"
    Dom.sectionWeightLoss.style.display ="none";
    Dom.sectionVegetarian.style.display ="none";
    Dom.emergencyGuide.style.display="none"
    Dom.searchingSection.style.display= "none"
    Dom.jokeSection.style.display ="none"
}
// create apiRequest 
let request = (verb, url, api)=>{
    return new Promise((resolve, reject)=>{
        const myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = ()=>{
        if(myRequest.readyState === 4){
            if(myRequest.status === 200){
                resolve(JSON.parse(myRequest.response))
                }
                else{
                resolve(alert("can't fetch data Sorry"))
            }
         }
        }
        myRequest.open(verb, url, api);
        myRequest.send();
    })
}
// joke endpoints
let getJoke = async function(){
    url = "https://api.spoonacular.com/food/jokes/random?"
    let joke = request("GET", url+api);
    let jokeResult = await joke;
    Dom.jokeText.textContent = jokeResult.text;
}


//recipe endpoints
// create a first function to display first 20 results then hide left arrow
function looping1(){
    Dom.recipeShowing.innerHTML =""
    console.log(recipeResult.results)
    for(var item = 0; item < 20; item++){
    
        Dom.recipeShowing.insertAdjacentHTML("beforeend", `<div class="col-20">
       <a class="healthy__link" href ="${recipeResult.results[item].id}"> <img class="showing__recipe-image" src="https://spoonacular.com/recipeImages/${recipeResult.results[item].image}" alt="recipe-image">
       <p>${recipeResult.results[item].title}</p></a>
       </div>`)
}
   count= 0;
   count1=0;
   Dom.leftArrow.style.display ="none";
   Dom.rightArrow.style.display ="block"
   
  
}
// create the second looping function and display left;
 function looping2(){
     Dom.recipeShowing.innerHTML=""
    for(var item = 20; item < 40; item++){
        Dom.recipeShowing.insertAdjacentHTML("beforeend", `<div class="col-20">
       <a class="healthy__link" href ="${recipeResult.results[item].id}"> <img class="showing__recipe-image" src="https://spoonacular.com/recipeImages/${recipeResult.results[item].image}" alt="recipe-image">
       <p>${recipeResult.results[item].title}</p></a>
       </div>`)
}
   Dom.leftArrow.style.display ="block";
   Dom.rightArrow.style.display= "block"
   count1 =0;
   count =1;
 }
// create the 3rd looping and display both arrow;

function looping3(){
    Dom.recipeShowing.innerHTML=""
    for(var item = 40; item < 60; item++){
        Dom.recipeShowing.insertAdjacentHTML("beforeend", `<div class="col-20">
       <a class="healthy__link" href ="${recipeResult.results[item].id}"> <img class="showing__recipe-image" src="https://spoonacular.com/recipeImages/${recipeResult.results[item].image}" alt="recipe-image">
       <p>${recipeResult.results[item].title}</p></a>
       </div>`)
}
   Dom.rightArrow.style.display ="none";
   count1 =1;
   count =2;
 }



// create the 4th looping and hide the right arrow;
let getSectionRecipe = async function(){
    let recipe = request("GET", url+api);
    recipeResult = await recipe;
    looping1();
    Dom.rightArrow.addEventListener("click", ()=>{
       if(count === 0 ){
           looping2();
       }
       else if(count ===1){
           looping3()
       }
       else if(count > 1){
           looping3();
       }
       
    })
    
    Dom.leftArrow.addEventListener("click", ()=>{
        if(count1 === 0){
            looping1();
        }
        else if(count1 ===1){
            looping2();
        }
    })
        
    Dom.showingRecipe.style.display ="block";
    hideSection();
    Dom.oneRecipeSection.style.display ="none";

}

// get the single recipe equipment
let recipeEquipment = async function(){
    url = `https://api.spoonacular.com/recipes/${attr}/equipmentWidget.json?`;
    let recipe = request("GET", url+api)
    let recipeResult = await recipe;
    for(let e = 0; e < recipeResult.equipment.length; e++){
        Dom.oneRecipe__equipments.insertAdjacentHTML('beforeend', `<span><img src ="https://spoonacular.com/cdn/equipment_100x100/${recipeResult.equipment[e].image}" class="oneRecipe__equipments-image">${recipeResult.equipment[e].name}</span>`)
    }

}


// get single recipe function
async function getSingleRecipe(){
    url =`https://api.spoonacular.com/recipes/${attr}/information?`;
    let recipe = request("GET", url+api);
    let recipeResult = await recipe;
    Dom.oneRecipe__image.innerHTML =`<h3 class="oneRecipe__title"> ${recipeResult.title}</h3>
    <img class= "recipe__img"alt="recipe-image" src= "${recipeResult.image}">`
    Dom.oneRecipe__details.innerHTML = `<span class="oneRecipe__details-score"><img src="https://img.icons8.com/plasticine/64/000000/clock.png" class="oneRecipe__details-img" alt="ready-in-minutes">Ready in ${recipeResult.readyInMinutes} minutes</span>
    <span class="oneRecipe__details-score"><img src="https://img.icons8.com/cotton/64/000000/rating.png" class="oneRecipe__details-img" alt="culinaree-score">Culinaree Score: ${recipeResult.spoonacularScore}%</span>
    <span class="oneRecipe__details-score"><img src="https://img.icons8.com/cute-clipart/64/000000/us-dollar.png"class="oneRecipe__details-img" alt="price-serving"> $${recipeResult.pricePerServing} per serving</span>`
    Dom.oneRecipe__summary.innerHTML =`<h4 class="oneRecipe__summary-title">Summary</h4>
    <p>${recipeResult.summary}</p>`
    Dom.oneRecipe__instructions.innerHTML =`<h4 class="oneRecipe__instructions-title">Instructions</h4>
    <p>${recipeResult.instructions}</p>`
    for(let i = 0; i < recipeResult.extendedIngredients.length; i++){
        Dom.oneRecipe__summary_list.insertAdjacentHTML('beforeend', `<li class="oneRecipe__summary-list-item"><img src="https://spoonacular.com/cdn/ingredients_100x100/${recipeResult.extendedIngredients[i].image}" class="summary-img"alt="ingredients-img">${recipeResult.extendedIngredients[i].original}</li>`)
    }
    hideSection();
    Dom.oneRecipeSection.style.display ="block"
 }

 
    
// create an object with different methods and properties related to the Dom 
let DomLiteral ={

    searchNavClick: function(){
        Dom.searchLogo.addEventListener("click", ()=>{
            Dom.recipe__search.style.display ="block"
        })
    },
    searchSectionClick: function(){
        if(Dom.SearchInput){
            Dom.SearchInput.addEventListener("click", ()=>{
                Dom.recipe__search.style.display ="block"
            })
        }
        
        
    },

    closeSearch : function(){
        Dom.closeSearch.addEventListener("click", ()=>{
            Dom.recipe__search.style.display ="none"
        })
    },

    fullGuide : function(){
        Dom.guideView.addEventListener("click", ()=>{
            Dom.sectionFullGuide.style.display ="block"
            hideSection();
            
        })
    },

    JokeFinal : function(){
        if(Dom.jokeButton){
            Dom.jokeButton.addEventListener('click', getJoke)
        }
        
    },


    recipeRequest : function(){
        for(let i = 0; i < Dom.recipe__anchor.length; i++){
            Dom.recipe__anchor[i].addEventListener("click", e=>{
                if(e.target.className.includes("health")){
                     url = "https://api.spoonacular.com/recipes/search?query=healthy&number=60&"
                    getSectionRecipe();
                }else if(e.target.className.includes("vegetable")){
                    url = "https://api.spoonacular.com/recipes/search?query=vegetarian&number=60&";
                   getSectionRecipe();
                }
                else if(e.target.className.includes("weightwatch")){
                     url = "https://api.spoonacular.com/recipes/search?query=weight&number=60&" 
                    getSectionRecipe();
                }
                else if(e.target.className.includes("pop")){
                    url = "https://api.spoonacular.com/recipes/search?query=popular&number=60&" 
                    getSectionRecipe();
                }   
            })
        }

    },
    showingSingleREcipe: function(){
        Dom.recipe_link.forEach(item =>{
            item.addEventListener("click",e =>{
                e.preventDefault();
                 attr = item.getAttribute('href');
                 getSingleRecipe();
                 recipeEquipment();
            })
        })
    },

    recipeSearchResult: function(){
        Dom.searchSectionContainer.addEventListener("submit", e=>{
            e.preventDefault();
            let searchValue = Dom.searchSectioninput.value;
            searchValue.split(" ").join("")
            url = `https://api.spoonacular.com/recipes/search?query=${searchValue}&number=60&`
            if(searchValue ===""|| undefined){
                alert("wrong input try input")

            }
            else{
                Dom.recipe__search.style.display = "none";
                let showing = Dom.recipeShowing.children;
                if(showing.length > 0){
                   Dom.recipeShowing.innerHTML=""
                }
                
                getSectionRecipe();
               
            }
            
            Dom.searchSectionContainer.reset();
        })
    }

}
DomLiteral.searchNavClick();
DomLiteral.searchSectionClick();
DomLiteral.closeSearch();
DomLiteral.JokeFinal();
DomLiteral.fullGuide();
DomLiteral.recipeRequest();
DomLiteral.showingSingleREcipe();
DomLiteral.recipeSearchResult();



Dom.showingRecipe.addEventListener("click", e=>{
    e.preventDefault();
    if(e.target.parentElement.hasAttribute("href")){
        attr = e.target.parentElement.getAttribute("href");
        getSingleRecipe();
        recipeEquipment();
        Dom.showingRecipe.style.display ="none";
    }
    
})