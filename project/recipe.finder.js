import { Ingredient, Recipe } from "./recipe.js";

var recipes, favs, groceryList;

function init() {
   recipes = document.getElementsByClassName("recipes");

   // for (let i = 0; i < recipes.length; i++) {
   //    recipes[i].onmouseenter = function() { showHoverWrapper(this); };
   //    recipes[i].onmouseleave = function() { hideHoverWrapper(this); };
   // }
}

function getIngredients(id) {
   let xhr = new XMLHttpRequest();
   let url = "https://www.food2fork.com/api/get?key=b6c1e27f00566da7486407e22abdd521&rId=" + id;

   xhr.open("GET", url);

   xhr.onload = function() {
      let recipe = JSON.parse(xhr.responseText).recipe;
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

function toggleFav(fav) {
   if (fav.classList.toggle("fav")) {
      console.log("added fav");
   } else {
      console.log("removed fav");
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

      let fav = document.createElement("i");
      fav.setAttribute("class", "fa fa-heart fav-btn");
      fav.onclick = function() { toggleFav(this); };

      let list = document.createElement("i");
      list.setAttribute("class", "fa fa-shopping-basket list-btn");

      let picCol = document.createElement("a");
      picCol.setAttribute("class", "col-12-fixed");
      picCol.setAttribute("href", recipes[r].source_url);

      let pic = document.createElement("img");
      pic.setAttribute("class", "recipe-img");
      pic.setAttribute("src", recipes[r].image_url);

      picCol.appendChild(pic);

      recipe.appendChild(title);
      recipe.appendChild(fav);
      recipe.appendChild(list);
      recipe.appendChild(picCol);

      result.appendChild(recipe);
   }
}