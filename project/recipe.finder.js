function loadData() {
   var xhr = new XMLHttpRequest();
   var q = encodeURIComponent(document.getElementById("ingredient").value.trim());
   var url = "https://www.food2fork.com/api/search?key=b6c1e27f00566da7486407e22abdd521&q=" + q;

   xhr.open("GET", url);

   xhr.onload = function() {
      var recipes = JSON.parse(xhr.responseText).recipes;
      var result = document.getElementById("result");

      for (r in recipes) {
         var recipe = document.createElement("a");
         recipe.setAttribute("class", "col-md-3-fixed col-6-fixed recipe");
         recipe.setAttribute("href", recipes[r].source_url);

         var wrapper = document.createElement("div");
         wrapper.setAttribute("class", "recipe-hover-wrapper");

         var title = document.createElement("h5");
         title.setAttribute("class", "recipe-title col-10");
         title.innerHTML = recipes[r].title;

         var fav = document.createElement("i");
         fav.setAttribute("class", "fa fa-heart fav");

         var list = document.createElement("i");
         list.setAttribute("class", "fa fa-shopping-basket list");

         wrapper.appendChild(title);
         wrapper.appendChild(fav);
         wrapper.appendChild(list);

         var picCol = document.createElement("div");
         picCol.setAttribute("class", "col-12-fixed");

         var pic = document.createElement("img");
         pic.setAttribute("class", "recipe-img");
         pic.setAttribute("src", recipes[r].image_url);

         picCol.appendChild(pic);

         recipe.appendChild(wrapper);
         recipe.appendChild(picCol);

         result.appendChild(recipe);
      }
   };

   xhr.onerror =  function() { result.innerHTML = "Request Failed"; };

   xhr.send();
}

function test() {
   console.log("'" + encodeURIComponent(" chicken saled ".trim()) + "'");
}

function showHoverWrapper() {
   let hoverWrapper = document.getElementsByClassName("recipe-hover-wrapper")[0];

   hoverWrapper.style.display = "block";
}

function hideHoverWrapper() {
   let hoverWrapper = document.getElementsByClassName("recipe-hover-wrapper")[0];

   hoverWrapper.style.display = "none";
   console.log("leave hover wrapper");
}