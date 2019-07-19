// import { Ingredient, Recipe } from "./recipe.js";
var Ingredient = function(name) {
   this.name = name;
   this.crossed_off = false;
}

var Recipe = function(id, title, image_url, source_url) {
   this.id = id;
   this.title = title;
   this.image_url = image_url;
   this.source_url = source_url;

   let ingredients = [];

   this.getIngredients = function() { return ingredients; }
   this.addIngredient = function(ingredient) { ingredients.push(new Ingredient(ingredient)); }
}

var recipes, favRecipes, groceryListRecipes, miscList;

function init() {
   if (recipes == null) { recipes = []; }
   if (favRecipes == null) { favRecipes = {}; }
   if (groceryListRecipes == null) { groceryListRecipes = {}; }
   if (miscList == null) { miscList = []; }
}

function addIngredients(id) {
   let xhr = new XMLHttpRequest();
   let url = "https://www.food2fork.com/api/get?key=b6c1e27f00566da7486407e22abdd521&rId=" + id;

   xhr.open("GET", url);

   xhr.onload = function() {
      let recipe = JSON.parse(xhr.responseText).recipe;

      for (let i in recipe.ingredients) {
         groceryListRecipes[id].addIngredient(recipe.ingredients[i]);
      }      
   };

   xhr.onerror =  function() { result.innerHTML = "Request Failed"; };

   xhr.send();
}

function loadData() {
   let xhr = new XMLHttpRequest();
   let q = encodeURIComponent(document.getElementById("ingredient").value.trim());
   let url = "https://www.food2fork.com/api/search?key=b6c1e27f00566da7486407e22abdd521&q=" + q;

   xhr.open("GET", url);

   xhr.onload = function() {
      recipes = JSON.parse(xhr.responseText).recipes;
      displayRecipes();
   };

   xhr.onerror =  function() { result.innerHTML = "Request Failed"; };

   xhr.send();
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
   let parent = fav.parentElement;
   let id = parent.id;
   if (fav.classList.toggle("fav")) {
      let recipe = createRecipe(parent);
      favRecipes[id] = recipe;
      console.log("added #" + id + " favorite recipes");
   } else {
      favRecipes[id] = null;
      console.log("removed #" + id + " favorite recipes");
   }
}

function addToGroceryListRecipes(list) {
   let parent = list.parentElement;
   let id = parent.id;

   if (favRecipes[id] != null) {
      groceryListRecipes[id] = favRecipes[id];
      if (favRecipes[id].getIngredients().length == 0) {
         addIngredients(id);
      }
   } else {
      let recipe = createRecipe(parent);
      groceryListRecipes[id] = recipe;
      addIngredients(id);
   }
}

function displayRecipes() {
   let result = document.getElementById("result");

   for (let i = result.childNodes.length - 1; i >= 0; i--) {
      result.removeChild(result.childNodes[i]);
   }

   for (r in recipes) {
      let recipe = document.createElement("div");
      recipe.setAttribute("class", "col-md-3-fixed col-6-fixed recipe");
      recipe.setAttribute("id", recipes[r].recipe_id);
      recipe.onmouseenter = function() { showHoverWrapper(this); };
      recipe.onmouseleave = function() { hideHoverWrapper(this); };

      let title = document.createElement("h5");
      title.setAttribute("class", "recipe-title col-10");
      title.innerHTML = recipes[r].title;

      recipe.appendChild(title);

      let fav = document.createElement("i");
      fav.setAttribute("class", "fa fa-heart fav-btn");
      fav.onclick = function() { toggleFav(this); };

      recipe.appendChild(fav);

      if (groceryListRecipes[recipes[r].recipe_id] == null) {
         let list = document.createElement("i");
         list.setAttribute("class", "fa fa-shopping-basket list-btn");
         list.onclick = function() { addToGroceryListRecipes(this); };

         recipe.appendChild(list);
      }
      
      let picCol = document.createElement("a");
      picCol.setAttribute("class", "col-12-fixed");
      picCol.setAttribute("href", recipes[r].source_url);

      let pic = document.createElement("img");
      pic.setAttribute("class", "recipe-img");
      pic.setAttribute("src", recipes[r].image_url);

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
   let name = document.getElementById("newItem").value;
   miscList.push(new Ingredient(name));

   if (miscList.length == 1) {
      displayMiscList();
   } else {
      let ulMisc = document.getElementById("ulMisc");
      ulMisc.appendChild(createIngredientLi(name, false));
   }
}

function displayGroceryList() {
   let result = document.getElementById("result");

   for (let i = result.childNodes.length - 1; i >= 0; i--) {
      result.removeChild(result.childNodes[i]);
   }

   for (let r in groceryListRecipes) {
      let ingredients = groceryListRecipes[r].getIngredients();

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