// import { Ingredient, Recipe } from "./recipe.js";
var Ingredient = function(name) {
   this.name = name;
   this.crossed_off = false;
}

var Recipe = function(recipe_id, title, image_url, source_url) {
   this.recipe_id = recipe_id;
   this.title = title;
   this.image_url = image_url;
   this.source_url = source_url;
   this.ingredients = [];
}

function init() {
   let recipes = JSON.parse(sessionStorage.getItem("recipes"));
   if (recipes == null) { sessionStorage.setItem("recipes", JSON.stringify([])); }

   let favRecipes = JSON.parse(localStorage.getItem("favRecipes"));
   if (favRecipes == null) { localStorage.setItem("favRecipes", JSON.stringify({})); }

   let groceryListRecipes = JSON.parse(localStorage.getItem("groceryListRecipes"));
   if (groceryListRecipes == null) { localStorage.setItem("groceryListRecipes", JSON.stringify({})); }

   let miscList = JSON.parse(localStorage.getItem("miscList"));
   if (miscList == null) { localStorage.setItem("miscList", JSON.stringify([])); }
}

function addIngredients(recipe_id) {
   let xhr = new XMLHttpRequest();
   let url = "https://www.food2fork.com/api/get?key=b6c1e27f00566da7486407e22abdd521&rId=" + recipe_id;

   xhr.open("GET", url);

   xhr.onload = function() {
      let recipe = JSON.parse(xhr.responseText).recipe;
      let groceryListRecipes = JSON.parse(localStorage.getItem("groceryListRecipes"));

      for (let i in recipe.ingredients) {
         groceryListRecipes[recipe_id].ingredients.push(new Ingredient(recipe.ingredients[i]));
      }     

      localStorage.setItem("groceryListRecipes", JSON.stringify(groceryListRecipes));
   };

   xhr.onerror =  function() { result.innerHTML = "Request Failed"; };

   xhr.send();
}

function loadRecipes() {
   let queryPreEncode = document.getElementById("ingredient").value.trim();

   if (sessionStorage.getItem("queryString") != queryPreEncode) {
      sessionStorage.setItem("queryString", queryPreEncode);

      let xhr = new XMLHttpRequest();
      let query = encodeURIComponent(queryPreEncode);
      let url = "https://www.food2fork.com/api/search?key=b6c1e27f00566da7486407e22abdd521&q=" + query;

      xhr.open("GET", url);

      xhr.onload = function() {
         let recipes = JSON.parse(xhr.responseText).recipes;
         sessionStorage.setItem("recipes", JSON.stringify(recipes));
         displayRecipes(recipes);
      };

      xhr.onerror =  function() { result.innerHTML = "Request Failed"; };

      xhr.send();
   }   
}

function showHoverWrapper(recipe) {
   recipe.getElementsByClassName("recipe-title")[0].style.opacity = 1;
   recipe.getElementsByClassName("fav-btn")[0].style.opacity = 1;
   recipe.getElementsByClassName("list-btn")[0].style.opacity = 1;
}

function hideHoverWrapper(recipe) {

   recipe.getElementsByClassName("recipe-title")[0].style.opacity = 0;

   if (recipe.getElementsByClassName("fav-btn")[0].classList.toggle("fav")) {
      recipe.getElementsByClassName("fav-btn")[0].style.opacity = 0;
   }
   recipe.getElementsByClassName("fav-btn")[0].classList.toggle("fav")

   recipe.getElementsByClassName("list-btn")[0].style.opacity = 0;
}

function createRecipe(parent) {
   let name = parent.getElementsByTagName("h5")[0].innerHTML;
   let link = parent.getElementsByTagName("a")[0];
   let img = link.getElementsByTagName("img")[0].src;
   let url = link.href;

   return (new Recipe(parent.id, name, img, url));
}

function toggleFav(fav) {
   let favRecipes = JSON.parse(localStorage.getItem("favRecipes"));
   let parent = fav.parentElement;
   let recipe_id = parent.id;

   if (fav.classList.toggle("fav")) {
      if (groceryListRecipes[recipe_id] != null) {
         favRecipes[recipe_id] = groceryListRecipes[recipe_id];
      } else {
         favRecipes[recipe_id] = createRecipe(parent);
      }
      
      console.log("added #" + recipe_id + " favorite recipes");
   } else {
      favRecipes[recipe_id] = null;
      console.log("removed #" + recipe_id + " favorite recipes");
   }

   localStorage.setItem("favRecipes", JSON.stringify(favRecipes));
}

function addToGroceryListRecipes(list) {
   let groceryListRecipes = JSON.parse(localStorage.getItem("groceryListRecipes"));
   let favRecipes = JSON.parse(localStorage.getItem("favRecipes"));
   let parent = list.parentElement;
   let recipe_id = parent.id;

   if (favRecipes[recipe_id] != null) {
      groceryListRecipes[recipe_id] = favRecipes[recipe_id];
      if (favRecipes[recipe_id].ingredients.length == 0) {
         addIngredients(recipe_id);
      }
   } else {
      groceryListRecipes[recipe_id] = createRecipe(parent);
      addIngredients(recipe_id);
   }

   localStorage.setItem("groceryListRecipes", JSON.stringify(groceryListRecipes));
}

function secureImg(img) {
   if (img[4].toLowerCase() != "s") {
      img = "https" + img.slice(4);
   }

   return img;
}

function displayRecipes(recipes) {
   let result = document.getElementById("result");

   for (let i = result.childNodes.length - 1; i >= 0; i--) {
      result.removeChild(result.childNodes[i]);
   }

   for (r in recipes) {
      let recipe = document.createElement("div");
      recipe.setAttribute("class", "col-md-3-fixed col-6-fixed recipe");
      recipe.setAttribute("id", recipes[r].recipe_id);
      recipe.onmouseenter = function() { showHoverWrapper(this); };
      recipe.onfocusin = function() { showHoverWrapper(this); };
      recipe.onmouseleave = function() { hideHoverWrapper(this); };
      recipe.onfocusout = function() { hideHoverWrapper(this); };

      let title = document.createElement("h5");
      title.setAttribute("class", "recipe-title col-10");
      title.innerHTML = recipes[r].title;

      recipe.appendChild(title);

      let fav = document.createElement("i");
      fav.setAttribute("class", "fa fa-heart fav-btn");
      fav.onclick = function() { toggleFav(this); };
      fav.ontouch = function() { toggleFav(this); };

      recipe.appendChild(fav);

      let groceryListRecipes = JSON.parse(localStorage.getItem("groceryListRecipes"));

      if (groceryListRecipes[recipes[r].recipe_id] == null) {
         let list = document.createElement("i");
         list.setAttribute("class", "fa fa-shopping-basket list-btn");
         list.onclick = function() { addToGroceryListRecipes(this); };
         list.ontouch = function() { addToGroceryListRecipes(this); };

         recipe.appendChild(list);
      }
      
      let picCol = document.createElement("a");
      picCol.setAttribute("class", "col-12-fixed");
      picCol.setAttribute("href", recipes[r].source_url);

      let pic = document.createElement("img");
      pic.setAttribute("class", "recipe-img");
      pic.setAttribute("src", secureImg(recipes[r].image_url));

      picCol.appendChild(pic); 

      recipe.appendChild(picCol);

      result.appendChild(recipe);
   }
}

// for list only

function createIngredientLi(name, crossedOff) {
   let li = document.createElement("li");
   li.innerHTML = name;
   li.setAttribute("class", crossedOff ? "ingredient crossed-off" : "ingredient");
   li.onclick = function() { toggleCrossOff(this); };
   li.ontouch = function() { toggleCrossOff(this); };

   return li;
}

function toggleCrossOff(ingredient) {
   if (ingredient.classList.toggle("crossed-off")) {
      console.log("crossed-off ingredient");
   } else {
      console.log("uncrossed-off ingredient");
   }
}

function displayMiscList() {
   let miscList = JSON.parse(localStorage.getItem("miscList"));
   let result = document.getElementById("result");

   let title = document.createElement("h3");
   title.innerHTML = "Misc";

   let ul = document.createElement("ul");
   ul.setAttribute("id", "ulMisc");

   for (let i in miscList) {
      ul.appendChild(createIngredientLi(miscList[i].name, miscList[i].crossed_off));
   }

   result.appendChild(title);
   result.appendChild(ul);
}

function addToMiscList() {
   let miscList = JSON.parse(localStorage.getItem("miscList"));
   let name = document.getElementById("newItem").value;

   miscList.push(new Ingredient(name));

   if (miscList.length == 1) {
      displayMiscList();
   } else {
      let ulMisc = document.getElementById("ulMisc");
      ulMisc.appendChild(createIngredientLi(name, false));
   }

   localStorage.setItem("miscList", JSON.stringify(miscList));
}

function displayGroceryList() {
   let groceryListRecipes = JSON.parse(localStorage.getItem("groceryListRecipes"));
   let miscList = JSON.parse(localStorage.getItem("miscList"));
   let result = document.getElementById("result");

   for (let i = result.childNodes.length - 1; i >= 0; i--) {
      result.removeChild(result.childNodes[i]);
   }

   for (let r in groceryListRecipes) {
      let ingredients = groceryListRecipes[r].ingredients;

      if (ingredients != null && ingredients.length > 0) {
         let title = document.createElement("h3");
         title.innerHTML = groceryListRecipes[r].title;

         let ul = document.createElement("ul");

         for (let i in ingredients) {
            ul.appendChild(createIngredientLi(ingredients[i].name, ingredients[i].crossed_off));
         }

         let br = document.createElement("br");

         result.appendChild(title);
         result.appendChild(ul);
         result.appendChild(br);
      }      
   }

   if (miscList.length > 0) {
      displayGroceryList();
   }
}